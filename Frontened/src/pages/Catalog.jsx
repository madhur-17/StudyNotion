import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { getAllCategories } from '../services/operations/courseApi';
import CourseCard from '../components/core/Catalog/CourseCard';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';





function Catalog() {
    const {catalogName}=useParams();
    const [data,setData]=useState(null);
    const [categoryId,setCategoryId]=useState("");
    
  useEffect(()=>{
      const getCategories=async()=>{
        const res=await getAllCategories();
      //console.log(res);
       
        const id=res.filter(ele=>ele.name.split(" ").join("-").toLowerCase()==catalogName)[0]._id;
      
        setCategoryId(id);
      }
      getCategories();
  },[catalogName])

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (categoryId) {
        try {
          const res = await getCatalogPageData(categoryId);
          console.log(res);
          setData(res);
        
        } catch (error) {
          console.error('Error fetching category data:', error);
        }
      }
    };
   
    fetchCategoryData();
  }, [categoryId]);
  




  return (
    <div className='text-white'>
        <div>
       
          <p>Home/Catalog/<span className='text-yellow-50'>{data?.selectedCategory?.name}</span></p>
          <p className='text-4xl'>{data?.selectedCategory?.name}</p>
          <p>{data?.selectedCategory?.description}</p>
        </div>


        <div>
          <div>
          <span>Courses to get you started</span>
            <div>
              <p>Most Popoluar</p>
              <p>New</p>
            </div>
            <div>
              <CourseSlider courses={data?.selectedCategory?.course}/>
            </div>
          </div>

          <div>
          <span>Top Courses</span>
            
            <div>
            <CourseSlider courses={data?.differentCategory?.course}/>
            </div>
          </div>



          <div>
          <span>Frequently Courses</span>
            
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                      {
                        data?.mostSellingCourses?.slice(0,4).map(ele=>(
                          <CourseCard course={ele} key={ele._id} Height={"h-[250px]"}/>
                        ))
                      }
                </div>
            </div>
          </div>

         
        </div>
    </div>
  )
}

export default Catalog
