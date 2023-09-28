import React from 'react';
import { useForm } from 'react-hook-form';
const WriteBlog = () => {
    
    const {handleSubmit,register} = useForm();
    const submit = (data) =>{
        console.log(data);
    }
    return (
        <div className='w-full md:w-1/2 p-5 m-auto'>
        <form onSubmit={handleSubmit(submit)} className=' items-center'>
          <div>
          <input
          {...register("title")}
            type="text"
            className='text-3xl mb-3 font-mono focus:outline-none'
            placeholder='Title'
            required
          />
          <input 
           {...register("category")}
           type="text"
           placeholder='Category'
           className=' mb-3 font-mono focus:outline-none'
           required
           />
          </div>
          <textarea
          {...register("description")}
            className='focus:outline-none font-mono'
            name="textarea"
            id=""
            required
            placeholder='Tell your story...'
            cols="30"
            rows="10"
          ></textarea>
          <div className='block md:flex'>
          <input
              type="file"
              id="file-input"
              className='mb-5'
              {...register("image")}
            />
            <input type="submit"   style={{
              backgroundColor: "black",
              borderRadius: "20px",
              padding: "10px 20px",
              fontFamily: "'Roboto Slab', serif",
              color: "white",
              border: "none",
            }} className='btn btn-sm'
            required />
          </div>
        </form>
      </div>
    );
};

export default WriteBlog;