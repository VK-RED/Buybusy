import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import styles from "../Styles/ErrorPage.module.css"

function ErrorPage(){

    const navigate = useNavigate();

    useEffect(()=>{

        setTimeout(()=>{
            navigate(-1);
        },2000)

    },[])

    return(
        <div className={styles.container}>
            <h2>OOPS !! The Page that you are looking for is not there. You will be redireced to the
                Previous Page shortly .. 
            </h2>
        </div>
    )
}

export default ErrorPage;