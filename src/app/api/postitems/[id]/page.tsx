"use client"

import { initialPost, PostProps } from '@/src/sections/Posts';
import React, {useState, useEffect} from 'react';
import Preloader from '@/src/components/Preloader';
import './style.css';
import SidePostItem from '@/src/components/SidePostItem';
import Link from 'next/link';
import { method } from 'lodash';
import { useRouter } from 'next/router';

export default function PostItem({params}: {params: {id: string}}) {
    const id: string = params.id;
    const router = useRouter();
    const [item, setItem] = useState(initialPost);
    const [items, setItems] = useState([]);

    const tabsData = [
        {id:1, name: 'Most Popular', active: true},
        {id:2, name: 'Trending', active: false},
    ];
    
    const [tabs, setTabs] = useState(tabsData);

    const handletabActive = (id: number):void => {
        setTabs(tabsData.map(tab => {
            tab.active=false;
            if(tab.id === id) tab.active = true;
            return tab;
            })
        );
    };

    const getSinglePostData = () => {
        fetch(`/api/postitems/${id}`)
        .then(res => res.json())
        .then(data => setItem(data))
        .catch(e => console.log(e.message));
    };

    const getItemsData = () => {
        fetch('api/postitems')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(e => console.log(e.message));
    };

    useEffect(() => {
        getSinglePostData();
        getItemsData();
    }, []);

    const handleDeletePost = async (id: string) => {
        // DELETE post request
        try {
            const response = await fetch(`/api/postitems/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const result = response.status;
            if (result === 200) {
                console.log("Success", result)
                router.push(`/postitems`)
            }
        } catch (error) {
            console.log("Error", error)
        }
    };
  return (
    <main id="main">
        <section className="single-post-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 post-content">
                        <div>
                            <div className="col-md-3">
                                <div className="aside-block">
                                    <ul className='nav nav-pills custom-tab-nav mb-4'>
                                        {
                                        tabs.map(tab => (
                                            <li className="nav-item" key={tab.id}>
                                                <button className={`nav-link 
                                                ${tab.active ? 'active' : undefined
                                            }`}
                                            onClick={() => handletabActive(tab.id)}
                                            >
                                                {tab.name}</button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="tab-content">
                                        <div className={`tab-pane fade ${
                                            tabs[0].active ? 'show active' : ''}`}>
                                            {items.slice(0,6)
                                            .map((item: PostProps) => (
                                                <SidePostItem key={item._id} item={item}/>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="tab-content">
                                        <div className={`tab-pane fade ${
                                            tabs[1].active ? 'show active' : ''}`}>
                                            {items.slice(6,12)
                                            .map((item: PostProps) => (
                                                <SidePostItem key={item._id} item={item}/>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      {item? (<div className="single-post">
                            <div className="post-meta">
                                <span className="date">{item.category}</span>
                                <span className="mx-1">
                                    <i className='bi bi-dot'></i>
                                </span>
                                <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
                            </div>
                            <h1 className='mb-4'>{item.title}</h1>
                            <p>
                                <span className="firstcharacter">
                                    {item.brief && item.brief.charAt(0)}
                                </span>
                                {item.brief && item.brief.substring(1)}
                            </p>
                            <figure className='my-4'>
                                <img src={`/${item.img}`} alt="" className='img-fluid' />
                            </figure>

                            <div className='d-flex justify-content-center gap-4'>
                                <a className='btn btn-primary' onClick={() => handleDeletePost (id)}>
                                    <i className="bi bi-trash3-fill"></i>
                                </a>
                                <Link href={`/createpostitem/${id}`} className = 'btn btn-primary'>
                                    <i className="bi bi-pencil"></i>
                                </Link>
                            </div>
                        </div>): ( <Preloader />)}  
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
