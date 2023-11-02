import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import formatDateAndTime from "../../DateTimeUtils";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

function BlogCard({ props, setMyBlogs, myBlogs, homepage }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newTittle, setNewTittle] = useState();
  const [newTextBody, setNewTextBody] = useState();


  const token = localStorage.getItem("token");

  const handleDeleteBlog = (blogId) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogId}`,
        {
          headers: {
            "X-Acciojob": token,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);

          const myBlogsNew = myBlogs.filter((blog) => blog._id !== blogId);
          setMyBlogs(myBlogsNew);
        }
      })
      .catch((err) => {
        alert("error" + err);
      });
  };

  const handleSubmit = (e, blogId) => {
    e.preventDefault();
    const newBlogObj = {
      blogId,
      title: newTittle,
      textBody: newTextBody,
    };

    axios.put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`,
      newBlogObj,
      {
        headers: {
          "x-Acciojob": token,
        },
      })
      .then((res) => {
        alert(res.data.message);
        setIsEdit(false);
        window.location.reload();
      })
      .catch((err) => {
        alert("erroe" + err);
      });
  };

  return (
    <Card style={{ width: "100%", marginBottom: "25px" }}>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {formatDateAndTime(new Date(props.creationDateTime))}
          </Card.Text>
        </div>

        <Card.Text>{props.textBody}</Card.Text>
        {
          homepage ? <></> :
            <>
              <Button variant="primary" style={{ marginRight: "15px" }} onClick={() => setIsEdit(!isEdit)}>
                Edit Blog
              </Button>
              <Button variant="danger" onClick={() => handleDeleteBlog(props._id)}>
                Delete Blog
              </Button>
            </>
        }
        {
          isEdit ? (
            <>
              <Form onSubmit={(e) => handleSubmit(e, props._id)}>
                <Form.Group className="mb-3 mt-4" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    onChange={(e) => setNewTittle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="textbody">
                  <Form.Label>Text Body</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter Text Body"
                    onChange={(e) => setNewTextBody(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" style={{ marginTop: "0px" }}>
                  Edit
                </Button>
              </Form>
            </>
          ) : (
            <></>
          )
        }

      </Card.Body>
    </Card>
  );
}

export default BlogCard;