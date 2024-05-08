import React from 'react'
import Highlight from '../components/core/HomePage/Highlight'
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import img4 from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/About/StatsComponent';
import LearnGrid from '../components/core/About/LearnGrid';
import ContactForm from '../components/core/About/ContactForm';
function About() {
  return (
    <div className='mt-[100px] max-w-maxContent  flex flex-col mx-auto text-white'>
      <section >
        <div className='w-11/12 text-center flex flex-col items-center mx-auto'>
            <header className='text-white text-4xl font-bold'>
                Driving Innovation in Online Education for a <Highlight text="Brighter Future"/>
                <p className='text-sm font-mono text-richblack-100'>
                    StudyNotion is at the forefront of driving innovation in online education.We're passinate
                    about creating a brighter future by offering education,new technologies,
                    and nurturing a vibrant learning community.
                </p>
            </header>
            <div className='flex flex-row gap-x-2'>
                <img src={img1} />
                <img src={img2} />
                <img src={img3} />
            </div>
        </div>
      </section>
      <section>
        <div>
        <header className='text-white text-4xl font-bold'>
                We are passionate about revolutionizing the way we learn. Our innovative platform combines
                 <Highlight text="technology,expertise"/> and community to create an <Highlight text="unpralled education experience."/>
                
            </header>
        </div>
      </section>
      <section>
        <div>
            <div className='flex flex-row'>
                <div className='text-white w-6/12'>
                    <h1 className='text-4xl'>Our Founding Story</h1>
                    <p> The idea sparked from personal experiences. Many of us struggled to find courses that resonated
                     with our interests or fit into our busy schedules. Traditional education systems often felt rigid 
                     and inaccessible. We believed there had to be a better way—a platform that democratized education,
                      breaking down barriers and empowering individuals to pursue their passions.</p>
                    <p>With this vision burning brightly in our hearts, we embarked on a journey to create a revolutionary
                     platform that would redefine the way people learn. Countless late nights were spent brainstorming, 
                     coding, and designing, fueled by a shared determination to make learning not only convenient but also
                      enriching and enjoyable.</p>
                </div>
                <div className='w-6/12'>
                    <img src={img4} />
                </div>
            </div>
            <div className='text-white flex flex-row'>
                <div>
                    <h1>Our Vision</h1>
                    <p>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would 
                    revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop 
                    a robust and intuitive platform that combines cutting-edge technology with engaging content, 
                    fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div>
                    <h1>Our Mission</h1>
                    <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community 
                    of learners, where individuals can connect, collaborate, and learn from one another. We believe that
                     knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration
                      through forums, live sessions, and networking opportunities.</p>

                </div>
            </div>
        </div>
      </section>
      <StatsComponent/>
      <LearnGrid/>
      <ContactForm/>
    </div>
  )
}

export default About
