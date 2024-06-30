import React, { Component } from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

class Footer extends Component {
  render() {
    return (
      <MDBFooter className='text-center' color='white' bgColor='dark'>
        <MDBContainer className='p-4'>
          <section className='mb-4'>
            <p>Contact us: Glam&shot@gmail.com</p>
          </section>

          <section className=''>
            <form action=''>
              <MDBRow className='d-flex justify-content-center'>
                <MDBCol size="auto">
                  <p className='pt-2'>
                    <strong>Glam And Shot</strong>
                  </p>
                </MDBCol>
                {/* ... rest of your code */}
              </MDBRow>
            </form>
          </section>

          <section className='mb-4'>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
              voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
              sequi voluptate quas.
            </p>
          </section>

          <section className=''>
            <MDBRow>
              {/* ... rest of your code */}
            </MDBRow>
          </section>
        </MDBContainer>

        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright:
          <a className='text-white' href='https://google.com/'>
            Glam&Shot.com
          </a>
        </div>
      </MDBFooter>
    );
  }
}

export default Footer;
