import React from "react";
// const Styles = {
//   footer: {
//     marginTop: "800px",
//   },
// };

function Footer() {
  return (
    <footer className="page-footer #1976d2 blue darken-2">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h5 className="white-text"> </h5>
            <p className="grey-text text-lighten-4">
             
            </p>
          </div>
          <div className="col s12">
            <h5 className="white-text"></h5>
            <ul>
              {/* <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 1
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 2
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 3
                </a>
              </li>
              <li>
                <a className="grey-text text-lighten-3" href="#!">
                  Link 4
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2020 Bart Dority
          <a className="grey-text text-lighten-4 right" href="http://vast-coast-19153.herokuapp.com/">
            GoogleBookShelf App Developer
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
