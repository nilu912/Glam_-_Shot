// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "./home_page.css";
// import "./bootstrap.css";
// import "./css_slider.css";
// // import OffCanvas from "./navbar-offcanva";

// export default class Homepage extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <>
//         {/* google fonts */}
//         <link
//           href="//fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900"
//           rel="stylesheet"
//         />
//         <link
//           href="//fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i"
//           rel="stylesheet"
//         />
//         {/* //google fonts */}
//         {/* banner */}
//         <section className="banner_w3lspvt" id="home">
//           <div className="csslider infinity" id="slider1">
//             <input
//               type="radio"
//               name="slides"
//               defaultChecked="checked"
//               id="slides_1"
//             />
//             <input type="radio" name="slides" id="slides_2" />
//             <input type="radio" name="slides" id="slides_3" />
//             <input type="radio" name="slides" id="slides_4" />
//             <ul>
//               <li>
//                 <div className="banner-top">
//                   <div className="overlay">
//                     <div className="container">
//                       <div className="w3layouts-banner-info">
//                         <h3 className="text-wh">
//                           We make your {" "}
//                           <span>
//                             style <span className="clr">perfect</span>
//                           </span>
//                         </h3>
//                         <h4 className="text-wh">
//                           We make your style <span>look Great, perfect!</span>
//                         </h4>
//                         <a href="about.html" className="button-style mt-4 mr-2">
//                           Read More
//                         </a>
//                         <a href="#about" className="button-style mt-4">
//                           Book Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//               <li>
//                 <div className="banner-top1">
//                   <div className="overlay">
//                     <div className="container">
//                       <div className="w3layouts-banner-info">
//                         <h3 className="text-wh">
//                           Skilled Barbers Make
//                           <span>
//                             Great <span className="clr">Beards</span>
//                           </span>
//                         </h3>
//                         <h4 className="text-wh">
//                           We make your hair <span>look Great, perfect!</span>
//                         </h4>
//                         <a href="about.html" className="button-style mt-4 mr-2">
//                           Read More
//                         </a>
//                         <a href="#about" className="button-style mt-4">
//                           Book Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//               <li>
//                 <div className="banner-top2">
//                   <div className="overlay">
//                     <div className="container">
//                       <div className="w3layouts-banner-info">
//                         <h3 className="text-wh">
//                           We make your hair{" "}
//                           <span>
//                             look <span className="clr">perfect</span>
//                           </span>
//                         </h3>
//                         <h4 className="text-wh">
//                           We make your hair <span>look Great, perfect!</span>
//                         </h4>
//                         <a href="about.html" className="button-style mt-4 mr-2">
//                           Read More
//                         </a>
//                         <a href="#about" className="button-style mt-4">
//                           Book Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//               <li>
//                 <div className="banner-top3">
//                   <div className="overlay">
//                     <div className="container">
//                       <div className="w3layouts-banner-info">
//                         <h3 className="text-wh">
//                           Skilled Barbers Make
//                           <span>
//                             Great <span className="clr">Beards</span>
//                           </span>
//                         </h3>
//                         <h4 className="text-wh">
//                           We make your hair <span>look Great, perfect!</span>
//                         </h4>
//                         <a href="about.html" className="button-style mt-4 mr-2">
//                           Read More
//                         </a>
//                         <a href="#about" className="button-style mt-4">
//                           Book Now
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             </ul>
//             <div className="arrows">
//               <label htmlFor="slides_1" />
//               <label htmlFor="slides_2" />
//               <label htmlFor="slides_3" />
//               <label htmlFor="slides_4" />
//             </div>
//           </div>
//         </section>
//         {/* //banner */}
//         {/* about */}
//         <section className="about py-5" id="about">
//           <div className="container py-lg-5">
//             <div className="row about-grids">
//               <div className="col-lg-8">
//                 <h2 className="mt-lg-3">Welcome to our Hair salon</h2>
//                 <h5 className="plane mt-md-4 mt-3">
//                   We make your hair <span>look Great, perfect!</span>
//                 </h5>
//                 <p className="">
//                   Sed ut perspiciatis unde omnis iste natus error ipsum
//                   voluptatem ut accusa ntium dolor remque laudantium, totam rem
//                   aperiam, eaque ipsa quae abse illo quasi sed architecto beatae
//                   vitae dicta sut dolor etr explicabo. Morbi a luctus magna, eut
//                   rutrum turpis. Sed perspiciatis unde omnis iste natus error
//                   ipsum voluptatem ut accusantium dolor.
//                 </p>
//                 <p className="mt-3">
//                   Eaque ipsa quae abse illo quasi sed architecto beatae vitae
//                   dicta sut dolor etr explicabo. Morbi a luctus magna, eu rutrum
//                   turpis. Sed perspiciatis unde omnis iste natus error et ipsum
//                   voluptatem ut accusantium dolor voluptatem ut accusa ntium
//                   dolor.
//                 </p>
//               </div>
//               <div className="col-lg-4 col-md-8 mt-lg-0 mt-5">
//                 <div className="padding">
//                   <img src="images/mustache.png" className="img-fluid" alt="" />
//                   <form action="#" method="post">
//                     <div className="form-style-agile">
//                       <input
//                         placeholder="Your Name"
//                         name="name"
//                         type="text"
//                         required=""
//                       />
//                       <input
//                         placeholder="Contact Number"
//                         name="number"
//                         type="text"
//                         required=""
//                       />
//                       <input placeholder="Address" type="text" required="" />
//                       <input placeholder="Timing" type="text" required="" />
//                       <button className="book-btn btn">
//                         Quick Appointment{" "}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* //about */}
//         {/* about bottom */}
//         <section className="bottom-banner-w3layouts">
//           <div className="d-lg-flex">
//             <div className="col-lg-7 p-lg-0 text-lg-right text-center mt-lg-0 mt-4 bottom-left"></div>
//             <div className="col-lg-5 banner-about text-center">
//               <span className="fa fa-scissors" />
//               <h4 className="mt-sm-4 mt-2">making hair style</h4>
//               <h5 className="bottom mt-m-4 mt-3">For man growing beards!</h5>
//               <p className="">
//                 Sed ut perspiciatis unde omnis iste natus error ipsum voluptatem
//                 ut accusa ntium dolor remque laudantium, totam rem aperiam,
//                 eaque ipsa quae abse illo quasi sed architecto beatae vitae
//                 dicta sut dolor etr explicabo. Morbi a luctus magna, eu rutrum
//                 turpis. Sed perspiciatis unde.
//               </p>
//             </div>
//           </div>
//         </section>
//         {/* //about bottom */}
//         {/* services */}
//         <section className="services py-5" id="services">
//           <div className="container py-lg-5 py-3">
//             <div className="row service-grid-grids text-center">
//               <div className="col-lg-4 col-md-6 service-grid service-grid1">
//                 <div className="service-icon">
//                   <span className="fa fa-puzzle-piece" />
//                 </div>
//                 <h4 className="mt-3">Skilled Barbers</h4>
//                 <p className="mt-3">
//                   Perspiciatis unde omnis iste natus doloret ipsum volupte ut
//                   accusal ntium dolor remque laudantium, totam dolor.
//                 </p>
//               </div>
//               <div className="col-lg-4 col-md-6 service-grid service-grid2 mt-md-0 mt-5">
//                 <div className="service-icon">
//                   <span className="fa fa-scissors" />
//                 </div>
//                 <h4 className="mt-3">Hair stylists</h4>
//                 <p className="mt-3">
//                   Perspiciatis unde omnis iste natus doloret ipsum volupte ut
//                   accusal ntium dolor remque laudantium, totam dolor.
//                 </p>
//               </div>
//               <div className="col-lg-4 col-md-6 service-grid service-grid3 mt-lg-0 mt-5">
//                 <div className="service-icon">
//                   <span className="fa fa-sliders" />
//                 </div>
//                 <h4 className="mt-3">Beard Grooming</h4>
//                 <p className="mt-3">
//                   Perspiciatis unde omnis iste natus doloret ipsum volupte ut
//                   accusal ntium dolor remque laudantium, totam dolor.
//                 </p>
//               </div>
//             </div>
//             <div className="row mt-5">
//               <div className="col-md-6 p-md-0">
//                 <div className="bg-image-left">
//                   <h4>skilled barbers</h4>
//                 </div>
//               </div>
//               <div className="col-md-6 p-md-0">
//                 <div className="bg-image-right">
//                   <h4>skilled barbers</h4>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 pr-md-0">
//                     <div className="bg-image-bottom1">
//                       <h4>Trimming</h4>
//                     </div>
//                   </div>
//                   <div className="col-md-6 pl-md-0">
//                     <div className="bg-image-bottom2">
//                       <h4>Shaving</h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* //services */}
//         {/* facts */}
//         <section className="facts" id="facts">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-7 py-5">
//                 <div className="row inner-heading">
//                   <h2 className="heading text-capitalize my-md-4">
//                     {" "}
//                     Why Choose Us
//                   </h2>
//                   <p className="mt-md-0 mt-2">
//                     Donec cursus congue risus, quis varius velit accumsan
//                     aliquam. Morbi semper nunc. Perspiciatis unde omnis iste
//                     natus doloret ipsum volupte ut accusal ntium dolor remque
//                     laudantium, totam dolor
//                   </p>
//                 </div>
//                 <div className="row mt-5 fact-grid-main">
//                   <div className="col-sm-4 stats-grid">
//                     <span className="fa fa-trophy" />
//                     <span>250</span>
//                     <h4>Experienced Barbers</h4>
//                   </div>
//                   <div className="col-sm-4 stats-grid">
//                     <span className="fa fa-scissors" />
//                     <span>50+</span>
//                     <h4>Amazing Hairstyles</h4>
//                   </div>
//                   <div className="col-sm-4 stats-grid">
//                     <span className="fa fa-smile-o" />
//                     <span>2000+</span>
//                     <h4>Satisfied clients</h4>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-5 p-lg-0 text-lg-right text-center">
//                 <img src="images/facts.png" className="img-fluid" alt="" />
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* //facts */}
//         {/* team */}
//         <section className="team py-5" id="team">
//           <div className="container py-md-4">
//             <div className="title-desc text-center">
//               <h3 className="heading text-capitalize mb-md-5 mb-4">
//                 our expert stylists
//               </h3>
//             </div>
//             <div className="row team-grid">
//               <div className="col-lg-3 col-sm-6">
//                 <div className="box13">
//                   <img
//                     src="images/team1.jpg"
//                     className="img-fluid img-thumbnail"
//                     alt=""
//                   />
//                   <div className="box-content">
//                     <h3 className="title">Williamson</h3>
//                     <span className="post">role in detail</span>
//                     <ul className="social">
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-facebook" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-twitter" />
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-sm-6 mt-sm-0 mt-4">
//                 <div className="box13">
//                   <img
//                     src="images/team2.jpg"
//                     className="img-fluid img-thumbnail"
//                     alt=""
//                   />
//                   <div className="box-content">
//                     <h3 className="title">Kristiana</h3>
//                     <span className="post">role in detail</span>
//                     <ul className="social">
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-facebook" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-twitter" />
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-sm-6 mt-lg-0 mt-4">
//                 <div className="box13">
//                   <img
//                     src="images/team3.jpg"
//                     className="img-fluid img-thumbnail"
//                     alt=""
//                   />
//                   <div className="box-content">
//                     <h3 className="title">Thomson</h3>
//                     <span className="post">role in detail</span>
//                     <ul className="social">
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-facebook" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-twitter" />
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-sm-6 mt-lg-0 mt-4">
//                 <div className="box13">
//                   <img
//                     src="images/team4.jpg"
//                     className="img-fluid img-thumbnail"
//                     alt=""
//                   />
//                   <div className="box-content">
//                     <h3 className="title">Watson</h3>
//                     <span className="post">role in detail</span>
//                     <ul className="social">
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-facebook" />
//                         </a>
//                       </li>
//                       <li>
//                         <a href="#">
//                           <span className="fa fa-twitter" />
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* //team */}
//         {/* footer top*/}
//         <div className="footer-top py-md-4">
//           <div className="container py-4">
//             <div className="row">
//               <div className="col-lg-9">
//                 <h4 className="footer-top-text text-capitalize">
//                   A wide range of male grooming services
//                 </h4>
//               </div>
//               <div className="col-lg-3 text-lg-right mt-lg-0 mt-4">
//                 <a
//                   href="services.html"
//                   className="text-capitalize serv_link btn"
//                 >
//                   Go to our Services
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* //footer top*/}
//         {/* footer */}
//         <footer className="py-sm-5 py-4">
//           <div className="container py-md-3">
//             <div className="footer-logo text-center">
//               <a className="navbar-brand" href="index.html">
//                 <span className="fa fa-scissors" />
//                 Men's Salon
//               </a>
//             </div>
//             <div className="row my-4 footer-middle">
//               <div className="col-md-5 text-md-right address">
//                 <p>
//                   <span className="fa fa-map-marker" />
//                   Location : 123 Street W, Seattle WA 99999 Paris, France.
//                 </p>
//               </div>
//               <div className="col-md-2 text-md-center my-md-0 my-sm-4 my-2 footer-icon">
//                 <span className="fa fa-scissors" />
//               </div>
//               <div className="col-md-5 text-md-left phone">
//                 <p>
//                   <span className="fa fa-phone" />
//                   Phone : +121 568 789 901
//                 </p>
//                 <p>
//                   <span className="fa fa-envelope-open" />
//                   Email : <a href="mailto:example@mail.com">example@mail.com</a>
//                 </p>
//               </div>
//             </div>
//             <div className="footer-grid">
//               <div className="social text-center">
//                 <ul className="d-flex justify-content-center">
//                   <li className="mx-2">
//                     <a href="#">
//                       <span className="fa fa-facebook" />
//                     </a>
//                   </li>
//                   <li className="mx-2">
//                     <a href="#">
//                       <span className="fa fa-twitter" />
//                     </a>
//                   </li>
//                   <li className="mx-2">
//                     <a href="#">
//                       <span className="fa fa-rss" />
//                     </a>
//                   </li>
//                   <li className="mx-2">
//                     <a href="#">
//                       <span className="fa fa-linkedin" />
//                     </a>
//                   </li>
//                   <li className="mx-2">
//                     <a href="#">
//                       <span className="fa fa-google-plus" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </footer>
//         {/* footer */}
//         {/* copyright */}
//         <div className="copyright py-3 text-center">
//           <p>
//             © 2019 Men's Salon. All Rights Reserved | Design by{" "}
//             <a href="http://w3layouts.com/" target="=_blank">
//               {" "}
//               W3layouts{" "}
//             </a>
//           </p>
//         </div>
//         {/* //copyright */}
//         {/* move top icon */}
//         <a href="#home" className="move-top text-center" />
//         {/* //move top icon */}
//       </>
//     );
//   }
// }
