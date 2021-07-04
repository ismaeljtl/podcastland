import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import styles from '../../styles/Category.module.css'

export default function Category (props: any) {

    useEffect(()=>{console.log(props), [props]});
    
    return <div className={styles.container}>
        Categorias: {JSON.stringify(props.data)}
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id: any = context.params!.id; 

    const data = await (await fetch(`${process.env.BASE_URL}/curated_podcasts/${id}`, {
        method: 'GET',
        headers:{ 'X-ListenAPI-Key': process.env.NEXT_PUBLIC_KEY!}
    })).json();
  
    // Pass data to the page via props
    return { props: { data } }
  }