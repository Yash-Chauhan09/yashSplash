import "./App.css";
import { useEffect, useState } from "react";
import Body from "./components/Body";
import Cards from "./components/Cards";
import "./components/Header.css";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { db, auth, storage, firebase} from "./firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const[input, setInput] = useState('')
  const [photos, setPhotos] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState(null);
  const [caption, setCaption] = useState("");
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUsers(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUsers(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [users, username]);
  useEffect(() => {
    db.collection("photos").orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPhotos(
        snapshot.docs.map((doc) => ({ id: doc.id, photo: doc.data() }))
      );
    });
  }, []);
  const [open, setOpen] = useState(false);
  const [opensignin, setOpensignin] = useState(false);
  const [opensubmit, setOpensubmit] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((e) => alert(e.message));
    setOpen(false);
  };
  const handleSignin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((e) => alert(e.mesaage));
    setOpensignin(false);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadImg = storage.ref(`images/${img.name}`).put(img);
    uploadImg.on(
      "state__changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage.ref("images").child(img.name).getDownloadURL().then(url=>{
          db.collection('photos').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            desc : caption,
            img: url,
            user: users.displayName
          })
          setProgress(0)
          setCaption('')
          setImg(null)
          setOpensubmit(false)
        });
      }
    );
  };
  return (
    <div className="App">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="App__signup">
            <center>
              <img
                src="https://image.flaticon.com/icons/png/512/3/3761.png"
                alt="logo"
                className="header__logoImg"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button onClick={handleLogin}> Singnup </Button>
          </form>
        </div>
      </Modal>
      <Modal open={opensignin} onClose={() => setOpensignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="App__signup">
            <center>
              <img
                src="https://image.flaticon.com/icons/png/512/3/3761.png"
                alt="logo"
                className="header__logoImg"
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Input
              placeholder="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button onClick={handleSignin}> Login </Button>
          </form>
        </div>
      </Modal>
      <Modal open={opensubmit} onClose={() => setOpensubmit(false)}>
        <div style={modalStyle} className={classes.paper}>
          {
            users?.displayName ? (
              <div className="app__submit">
              <progress value={progress} max="100"/>
              <input
              className='app__submitInput1'
                type="text"
                placeholder="Enter a caption"
                value={caption}
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
              <input className='app__submitInput2'  type="file" onChange={handleChange} />
              <Button style={{backgroundColor:'#37A866'}} onClick={handleUpload}> Upload🐱‍👤</Button>
              </div>
            ):
              <h2>Sorry need to login first</h2>
            }
        </div>
      </Modal>
      <div className="header">
        <div className="header__logo">
          <img
            src="https://image.flaticon.com/icons/png/512/3/3761.png"
            alt="logo"
            className="header__logoImg"
          />
          <div className="header__logoText">
            <h4>YashSplash</h4>
            <p>Photos for everyone</p>
          </div>
        </div>
        <div className="header__search">
          <SearchIcon classname="header__searchIcon" />
          <input type="text" placeholder="Search free high resolution photos" value={input} onChange={(e)=>{
            setInput(e.target.value)
          }}  />
        </div>
        <div className="header__right">
          <div className="header__rightExplore">
            <a href="#images">Explore</a>
            <MoreHorizIcon />
            <button onClick={() => setOpensubmit(true)}>Submit a photo📸</button>
          </div>
          <div className="header__rightJoin">
            {users ? (
              <button onClick={() => auth.signOut()}>Logout</button>
            ) : (
              <button
                onClick={() => {
                  setOpensignin(true);
                }}
              >
                Login
              </button>
            )}
            {users ? (
              <button>Welcome😍</button>
            ) : (
              <button onClick={() => setOpen(true)}>Join free</button>
            )}
          </div>
        </div>
      </div>
      <Body value={input} change={setInput} />
      <div id="images" className="app__cards">
        {photos.filter(({photo})=>{
   if(input===''){
     return photo
   }
   else if(`${photo.desc}`.includes(input)){
     return photo
   }
        }).map(({ photo, id }) => {
          return (
            <Cards
              key={id}
              desc={photo.desc}
              user={photo.user}
              img={photo.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
