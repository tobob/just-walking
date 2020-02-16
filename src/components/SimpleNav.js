import React from 'react';
import Back from '../assets/svg/Back';

const SimpleRow = ({ withGoBack = false }) => {

  const goBack = () => window.history.go(-1)
  return (

    <div className="simple-nav">
      <div className="container container-left">
        {withGoBack && <div onClick={goBack} className="go-back">
          <Back stroke="white" />
          <h4>BACK</h4>
        </div>}
      </div>
      <div className='container container-right'>
        <a href="/"><h1>Just Walking<span className="me">.me</span></h1></a>
      </div>
    </div>
  )
}

export default SimpleRow;
