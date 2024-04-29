import React, {useEffect, useRef, useState} from 'react'
import './ImageUpload.css';
import Button from '../Button/Button';

const ImageUpload = (props) => {
  const pickImageRef = useRef();
  const [file, setFile] = useState();
  const [filePreview, setFilePreview] = useState();
  const [isValid, setIsValid] = useState(false)

  const pickedImageHandler = (event) => {
    let isValidFile = isValid;
    let pickedFile;
    if(event.target.files && event.target.files.length === 1)
    {
      pickedFile = event.target.files[0];
      setFile(pickedFile)
      setIsValid(true);
      isValidFile = true;
    }
    else
    {
      isValidFile = false;
      setIsValid(false)
    }
    props.onInput(props.id, pickedFile, isValidFile)
  }

  useEffect(() => {
    if(!file)
    {
      console.log('Empty file');
      return;
    }
    else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFilePreview(fileReader.result);
      }
      fileReader.readAsDataURL(file)
    }
  }, [file]);

  const pickImageHandler = () => {
    pickImageRef.current.click()
  }
  return (
    <div className='form-control'>
        <input 
            type="file" 
            ref={pickImageRef}
            id={props.id}
            style={{display : 'none'}}
            acept=".jpg, .png, .jpeg"
            onChange={pickedImageHandler}
        />
        <div className={`image-upload ${props.center && 'center'}`}>
            <div className="image-upload__preview">
                {filePreview && <img src={filePreview} alt="Preview" />}
                {!filePreview && <p>Please select an image</p>}
            </div>
            <Button type='button' onClick={pickImageHandler}>Pick Image</Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload