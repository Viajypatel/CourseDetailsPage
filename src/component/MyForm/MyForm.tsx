import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  age: z.number().min(18, "Must be at least 18 years old").max(120, "Age must be realistic"),
});

// Infer the type from the schema
type FormData = z.infer<typeof schema>;

const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined, // Zod schema expects number, so undefined is fine for default pre-population
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              id="name"
              placeholder="Enter your name"
              {...register("name")} 
              className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} transition duration-150 ease-in-out`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              id="email"
              placeholder="you@example.com"
              {...register("email")} 
              className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} transition duration-150 ease-in-out`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              {...register("age", { valueAsNumber: true })}
              className={`w-full px-4 py-3 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${errors.age ? 'focus:ring-red-500' : 'focus:ring-indigo-500'} transition duration-150 ease-in-out`}
            />
            {errors.age && <p className="mt-1 text-xs text-red-600">{errors.age.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyForm; 