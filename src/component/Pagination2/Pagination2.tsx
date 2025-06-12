import React, { useEffect, useState, useMemo, ChangeEvent } from 'react';
import axios from "axios";

// Define an interface for the data items
interface PicItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const Pagination2: React.FC = () => {
    const API_URL = 'https://picsum.photos/v2/list?limit=100';
    const [allData, setAllData] = useState<PicItem[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>('');
    const itemsPerPage = 7;
    
    // startIndex and endIndex will be calculated inside useMemo or before return if dependent on currentPage

    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get<PicItem[]>(API_URL);
            setAllData(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message);
            } else {
                console.log("An unexpected error occurred");
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        if (inputValue.length === 0) {
            return allData;
        }
        return allData.filter((ele) =>
            ele.author.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [allData, inputValue]);

    useEffect(() => {
        setCurrentPage(1);
    }, [inputValue]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const visiblePage = 10;
    const pagesBeforeCurrent = Math.floor(visiblePage / 2);
    const pagesAfterCurrent = Math.ceil(visiblePage / 2) - 1;

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    if (loading) {
        return <div className='text-red-800 flex justify-center items-center h-screen'>Loading...</div>;
    }

    let startPage: number;
    let endPage: number;

    if (totalPages <= visiblePage) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage + pagesAfterCurrent >= totalPages) {
            startPage = totalPages - visiblePage + 1;
            if (startPage < 1) startPage = 1;
            endPage = totalPages;
        } else if (currentPage - pagesBeforeCurrent > 1) {
            startPage = currentPage - pagesBeforeCurrent;
            endPage = currentPage + pagesAfterCurrent;
        } else {
            startPage = 1;
            endPage = visiblePage;
        }
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleData = filteredData.slice(startIndex, endIndex);
    const visiblePageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className='bg-gray-100 min-h-screen m-0 p-0'>
            <div className='h-[50px] flex justify-center items-center '>
                <input onChange={handleInputChange} type="text" placeholder="search by author" className=' text-center' />
            </div>
            <div className='flex flex-wrap gap-2'>
                {visibleData.map((item) => (
                    <div key={item.id} className='h-[150px] w-[150px] bg-slate-600 justify-start'>
                        <img src={item.download_url} alt={item.author} className='h-full w-full object-cover' />
                    </div>
                ))}
            </div>
            <button disabled={currentPage === 1} className={`bg-blue-500 text-white px-4 py-2 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            {visiblePageNumbers.map((page) => (
                <button key={page} className={`border border-1 border-black px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-700 text-white' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
            ))}
            <button disabled={currentPage === totalPages} className={`bg-blue-500 text-white px-4 py-2 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            <div>{inputValue}</div>
        </div>
    );
}

export default Pagination2; 