import React from "react";
import { usePagination } from "../../../hooks/usePagination";
import classes from '../pagination/Pagination.module.css';


const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = usePagination(totalPages);
    return (
        <div className={classes.pagenation_wrapper}>
            {pagesArray.map(p =>
                <span
                    onClick={() => changePage(p)}
                    key={p}
                    className={
                        page === p 
                        ? `${classes.page_current} ${classes.page}`
                        : classes.page}>
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;