import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContext } from "../contexts/AdminProvider";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminTable() {
  const { getPosts, posts, deletePost } = React.useContext(AdminContext);
  React.useEffect(() => {
    getPosts();
  }, []);
  if (!posts) {
    return <h2>Loading...</h2>;
  }
  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "15%", position: "relative", bottom: "50px" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Button
                  style={{ backgroundColor: "black" }}
                  onClick={() => deletePost(item.id)}
                  variant="contained"
                >
                  del
                </Button>
              </TableCell>
              <TableCell>
                <Link to={`/admin-panel/edit/${item.id}`}>
                  <Button
                    style={{ backgroundColor: "black" }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </Link>
              </TableCell>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                <img width={120} src={item.image} alt="product-image" />
              </TableCell>
              <TableCell align="right">{item.brand}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.color}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
