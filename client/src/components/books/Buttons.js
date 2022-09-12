import { useConfigButtons } from "../../hooks/useConfigButtons";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Button, Modal, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDeleteBookMutation, useAddBookMutation } from "../../reducers/libraryApi";


const Buttons = ({books, wishlist, book, wishlistObj, bookObj}) => {
  const userId = useSelector(state => state.user.user._id);

  const {inLibrary, inWishlist, setInLibrary, setInWishlist } = useConfigButtons(books, wishlist, book);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("")
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const [deleteBook, result] = useDeleteBookMutation();
  const [addBook, addBookresult] = useAddBookMutation();

    const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -150%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const Worm = styled('img')({
    height: "50px",
    width: "140px"
  })

  useEffect(() => {
    if (modalText) {
      handleOpen()
    }
  }, [modalText])

      const addToRead = async () => {
     const response = await addBook(bookObj).unwrap();
     if (response.message === "Book added to library") {
       setModalText(`${bookObj.title} has been added to your library!`);
       setInLibrary(true);
     }
     else if (response.message === "Book already in library") {
      setModalText(`${bookObj.title} is already in your library`)
     }
     else {
      setModalText(`There was an issue adding ${bookObj.title} to your library, please try again.`)
     }
     
    }
  
    const addToWishlist = async () => {
       const response = await addBook(wishlistObj).unwrap();

        if (response.message === "Book added to wishlist") {
          setModalText(`${wishlistObj.title} has been added to your wishlist!`);
          setInWishlist(true);
        }
        else if (response.message === "This book is already on your wishlist") {
          setModalText(`${wishlistObj.title} is already on your wishlist`)
        }
        else {
          setModalText(`There was an issue adding ${wishlistObj.title} to your wishlist, please try again.`)
        }
      
  
    }

    const renderButtons = () => {
    
  
      if (inLibrary) {
        return (
          <Stack maxWidth="250px">
            <Button variant="contained" color="secondary" onClick={async () => {
        
              const bookToDelete = books.find((title) => title.googleLink === book.selfLink);
              console.log(bookToDelete)
              const id = bookToDelete._id
              const payload = {user: userId, type: "library"}
              
              const response = await deleteBook({id, payload}).unwrap();
              console.log(response)
              if (response.message === "Book deleted") {
                setModalText(`${bookToDelete.title} has been removed from your library`)
                setInLibrary(false)
              }
              else {
                setModalText(`There was an issue removing ${bookToDelete.title} from your library, please try again`)
              }
              
             
    
              }}>Remove from my library</Button>
          </Stack>
        )
      }
      else if (inWishlist) {
        return (
          <Stack maxWidth="250px">
            <Button variant="contained" color="secondary" onClick={async () => {
              const bookToDelete = wishlist.find((title) => title.googleLink === book.selfLink);
              const id = bookToDelete._id
              const payload = {user: userId, type: "wishlist"}
             
              const response = await deleteBook({id, payload});
              if (response.data.message === "Book deleted") {
                setModalText(`${bookToDelete.title} has been removed from your wishlist`)
              }
              else {
                setModalText(`There was an issue removing ${bookToDelete.title} from your library, please try again`)
              }
              setInWishlist(false)
              
        
              }}>Remove from my wishlist</Button>
          </Stack>
        )
      }
      else {
        return (
          <Stack align="left" maxWidth="200px" sx={{gap: "10px"}}>
              <Button variant="contained" color="secondary" onClick={addToRead}>I've Read This Book</Button>
             <Button variant="contained" color="secondary" onClick={addToWishlist}>I Want To read this book</Button>
          </Stack>
        )
        
      }
    }

  return (
    <div>{renderButtons()}
     <Modal
            open={modalOpen}
            onClose={handleClose}
            // add aria labels
            >
              <Box sx={modalStyle}>
                <Typography variant="h6" align="center">{modalText}</Typography>
                <Box display="flex" justifyContent="center"><Worm src="../../favicon.ico" alt="little worm"/></Box>
              </Box>
          </Modal></div>
  )
}

export default Buttons