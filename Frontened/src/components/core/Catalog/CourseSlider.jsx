import React from 'react'
import {Swiper, SwiperSlide,} from "swiper/react"
import "swiper/css";
import "swiper/css/pagination"
import 'swiper/css/effect-coverflow';
import {Pagination, Autoplay,EffectCoverflow} from "swiper/modules"
import CourseCard from './CourseCard';
function CourseSlider({courses}) {
  return (
    <div>
      {courses?.length>0?(<div>
          
      <Swiper loop={true} slidesPerView={3} spaceBetween={200}  pagination={true}
      className='myswipper'   centeredSlides={true}
      autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        effect={'coverflow'}
        grabCursor={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Pagination,Autoplay,EffectCoverflow]}
      >
          {
            courses?.map((ele)=>(
              <SwiperSlide key={ele._id}>
                  <CourseCard course={ele} Height={"h-[100px]"}/>
              </SwiperSlide>
            ))
          }
      </Swiper>
      </div>):(<p>No courses found</p>)}
    </div>
  )
}

export default CourseSlider
