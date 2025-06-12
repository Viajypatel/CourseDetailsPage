import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import axios from 'axios';
import Card from '../../component/Card/Card';
import useImageStore from '../../store/imageStore';

const ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 10;
const API_URL = 'https://picsum.photos/v2/list?limit=100';

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const PhotoGallery: React.FC = () => {
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [goToPageInput, setGoToPageInput] = useState<string>('');

  const { loading, error, imageData, setImageData, setLoading, setError } =
    useImageStore();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Photo[]>(API_URL);
        setImageData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch photos. Please try again later.');
        console.error(err);
        setImageData([]);
        setFilteredPhotos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [setImageData, setLoading, setError]);

  const handleSearch = useCallback(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = imageData.filter((photo) =>
      photo.author.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredPhotos(filtered);
    setCurrentPage(1);
  }, [searchTerm, imageData]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, imageData, handleSearch]);

  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPhotos = filteredPhotos.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleClickNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleClickPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
    setGoToPageInput('');
  };

  let startPage: number, endPage: number;
  if (totalPages <= MAX_VISIBLE_PAGES) {
    startPage = 1;
    endPage = totalPages;
  } else {
    const pagesBefore = Math.floor(MAX_VISIBLE_PAGES / 2);
    const pagesAfter = Math.ceil(MAX_VISIBLE_PAGES / 2) - 1;

    if (currentPage <= pagesBefore) {
      startPage = 1;
      endPage = MAX_VISIBLE_PAGES;
    } else if (currentPage + pagesAfter >= totalPages) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - pagesBefore;
      endPage = currentPage + pagesAfter;
    }
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  if (loading) {
    return <div className="text-center p-10">Loading photos...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Filter by author..."
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        />
      </div>

      {filteredPhotos.length === 0 && !loading && (
        <div className="text-center p-10">
          No photos found for the given filter or no photos available.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {currentPhotos.map((photo) => (
          <Card key={photo.id} imageUrl={photo.download_url} author={photo.author} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-2 mt-8">
          <button
            onClick={handleClickPrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
          >
            Prev
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageClick(1)}
                className="px-3 py-2 rounded-lg bg-white text-blue-500 hover:bg-blue-100 shadow"
              >
                1
              </button>
              {startPage > 2 && <span className="px-1 py-2">...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-2 rounded-lg shadow ${
                currentPage === page
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-blue-500 hover:bg-blue-100'
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-1 py-2">...</span>}
              <button
                onClick={() => handlePageClick(totalPages)}
                className="px-3 py-2 rounded-lg bg-white text-blue-500 hover:bg-blue-100 shadow"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={handleClickNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>

          <div className="flex items-center space-x-1 ml-0 sm:ml-2 mt-4 sm:mt-0">
            <input
              type="number"
              value={goToPageInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setGoToPageInput(e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') handleGoToPage();
              }}
              className="px-2 py-1 border border-gray-300 rounded-lg shadow-sm w-16 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
              min="1"
              max={totalPages}
              placeholder="Page"
            />
            <button
              onClick={handleGoToPage}
              className="px-3 py-1.5 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 text-sm"
            >
              Go
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
