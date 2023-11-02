import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import BlogCard from "../components/Blogs/BlogsCard";

function Homepage() {
    const [homeBlogs, setHomeBlogs] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                setHomeBlogs(res.data.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [token]);


    return (
        <div>
            <Header />
            <h1 style={{ textAlign: "center", paddingTop: "20PX"}}>Homepage</h1>
            <div style={{ padding: "30px" }}>
                {
                    homeBlogs?.map((blog) => (
                        <BlogCard props={blog} homepage={true} />
                    ))
                }
            </div>
        </div>
    )
}

export default Homepage;