import { SocialIcon} from 'react-social-icons'
const Footer = () =>{
    return (
        <div className=" d-flex justify-content-around bg-info ">
            <h1 className="text-white p-5">THE GENERICS</h1>
            <div className='p-5'>
            <SocialIcon className="m-1" url="https://twitter.com" />
            <SocialIcon className="m-1" url="https://www.youtube.com/" />
            <SocialIcon className="m-1" url="https://www.facebook.com/" />
            </div>
        </div>
    )
}
export default Footer;