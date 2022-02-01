import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Box from "../components/UI/box/Box";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../hooks/useFetching";

const AlbumId = () => {
    const params = useParams()
    const [photos, setPhotos] = useState([]);
    const [fatchPhotosById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getPhotosByAlbumId(id);
        setPhotos(response.data);
    });
    useEffect(() => {
        fatchPhotosById(params.id)
    }, [])

    return (
        <div>
           <h1>Albom №{params.id}</h1>
            {isLoading
                ? <Loader />
                : <div>
                    {photos.map(c => 
                        <div key={c.id}>
                        <Box id={c.id} title={c.title}>
                          <img src={c.thumbnailUrl}/>
                        </Box>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default AlbumId;