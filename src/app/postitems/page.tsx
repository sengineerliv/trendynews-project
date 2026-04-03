"use client"
import PostItemOne from '@/src/components/PostItemOne';
import Preloader from '@/src/components/Preloader';
import PageTitle from '@/src/components/PageTitle';
import { PostProps } from '@/src/sections/Posts';
import React, {useState, useEffect} from 'react';

export default function PostItems() {
    const [items, setItems] = useState([]);

    const getItemsData = () => {
        fetch (`/api/postitems`)
        .then(res => res.json())
        .then(data =>setItems(data))
        .catch(e => console.log(e.message));
    }

    useEffect(() => {
        getItemsData();
    }, [items]);

  return (
    <main id="main">
        <section id="posts" className="posts">
            <div className="container">
                <div className="row">
                    <PageTitle title="Post Items List"/>
                    {items && items.length > 0 ? (
                        items.map((item: PostProps) => (
                            <div className='col-lg-3 col-md-6' key={item._id}>
                                <PostItemOne large={false} item={item} />
                            </div>
                        ))
                       ): ( <Preloader/> 
                       )}
                </div>
            </div>
        </section>
    </main>
  );
}
