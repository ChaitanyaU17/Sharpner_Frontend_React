const Footer = () => {
    return (
      <footer className="flex absolute w-full justify-center bottom-0 bg-gray-800 text-white text-center p-4 ">
        <p className="text-sm">
          © {new Date().getFullYear()} Foodie Restaurant. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default Footer;
  