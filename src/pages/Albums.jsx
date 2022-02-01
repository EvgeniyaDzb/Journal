import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import PostService from "../API/PostService";
import AlbumItem from "../components/Albums/AlbumItem";
import AnimatedList from "../components/UI/list/AnimatedList";
import Loader from "../components/UI/loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const [fetchAlbums, isAlbumsLoading, albumsError] = useFetching(async (limit, page) => {
        const response = await PostService.getAllAlbums(limit, page);
        setAlbums(response.data);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))
    });

    useEffect(() => {
        fetchAlbums(limit, page)
    }, [page, limit])

    const changePage = (page) => {
        setPage(page);
    }

    const navigate = useNavigate();

    return (
        <div>
            <h1>Albums</h1>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Number of items per page'
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Show all' },
                ]}
            />
            {albumsError && navigate(`/error`)  }
           
            <AnimatedList title="The list of albums" items={albums} render={(item) => {
                return <AlbumItem album={item}/>
            }}/>

            {isAlbumsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
            }

            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div>
    );
};

export default Albums;