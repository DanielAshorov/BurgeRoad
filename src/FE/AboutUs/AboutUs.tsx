import React, { useEffect } from 'react'
import './AboutUs.style.css';
import FirstSoftwareimage from '../../assets/images/software_one.jpg';
import FirstSoftwareTwoimage from '../../assets/images/two.jpg';
import FirstSoftwareThreeimage from '../../assets/images/three.jpg';
import FirstSoftwareFourimage from '../../assets/images/four.jpg';


export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us";
  }, [])
  return (
    <div>
      <section className='section_main'>
        <div className='_p_s_x_x_x_x_x'>
          <button className='return_btn'>Return To HomePage</button>
        </div>
        <div className="flex _p_w_e_3_x_s" id='_P_E_E_EE_'>
          <div>
            <img src={FirstSoftwareimage} alt="" className='first_image' />
          </div>
          <div className='flex column'>
            <div>
              <div className='full_name'> Ori Goldenberg</div>
            </div>
            <div>
              <div className="other_experience">
                <div className='flex column'>
                  <div className='flex'>
                    <b className='roboto-font _p_a_s'>Position: &nbsp;</b>
                    <span className='roboto-font'> Support manager and FullStack</span>
                  </div>
                  <div className='flex'>
                    <b className='roboto-font'>Contact Me: &nbsp;</b>
                    <a href="https://www.linkedin.com/in/ori-goldenberg-0b3950192/overlay/contact-info/" className='roboto-font'>linkedin.com/in/ori-goldenberg-0b3950192</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex _p_w_e_3_x_s" id='_P_E_E_EE_'>
          <div>
            <img src={FirstSoftwareTwoimage} alt="" className='first_image' />
          </div>
          <div className='flex column'>
            <div>
              <div className='full_name'> Daniel Ashorov</div>
            </div>
            <div>
              <div className="other_experience">
                <div className='flex column'>
                  <div className='flex'>
                    <b className='roboto-font _p_a_s'>Position: &nbsp;</b>
                    <span className='roboto-font'> Full Stack and Android developer</span>
                  </div>
                  <div className='flex'>
                    <b className='roboto-font'>Contact Me: &nbsp;</b>
                    <a href="https://www.linkedin.com/in/daniel-ashorov-354534221/overlay/contact-info/" className='roboto-font'>linkedin.com/in/daniel-ashorov-354534221</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex _p_w_e_3_x_s" id='_P_E_E_EE_'>
          <div>
            <img src={FirstSoftwareThreeimage} alt="" className='first_image' />
          </div>
          <div className='flex column'>
            <div>
              <div className='full_name'> Ohad Edry</div>
            </div>
            <div>
              <div className="other_experience">
                <div className='flex column'>
                  <div className='flex'>
                    <b className='roboto-font _p_a_s'>Position: &nbsp;</b>
                    <span className='roboto-font'> QA Engineer and Fullstack developer</span>
                  </div>
                  <div className='flex'>
                    <b className='roboto-font'>Contact Me: &nbsp;</b>
                    <a href="https://www.linkedin.com/in/ohad-edry/overlay/contact-info/" className='roboto-font'>linkedin.com/in/ohad-edry</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex _p_w_e_3_x_s" id='_P_E_E_EE_'>
          <div>
            <img src={FirstSoftwareFourimage} alt="" className='first_image' />
          </div>
          <div className='flex column'>
            <div>
              <div className='full_name'> Netanel Shimoni</div>
            </div>
            <div>
              <div className="other_experience">
                <div className='flex column'>
                  <div className='flex'>
                    <b className='roboto-font _p_a_s'>Position: &nbsp;</b>
                    <span className='roboto-font'>Fullstack developer</span>
                  </div>
                  <div className='flex'>
                    <b className='roboto-font'>Contact Me: &nbsp;</b>
                    <a href="https://www.linkedin.com/in/ohad-edry/overlay/contact-info/" className='roboto-font'>linkedin.com/in/ohad-edry</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

