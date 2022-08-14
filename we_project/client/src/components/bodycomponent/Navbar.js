import React from 'react'
import 'C:/Users/moaaz/Desktop/Javascript Projects/we_project/client/src/components/bodycomponent/Navbar.js'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate} from 'react-router-dom'

const schema = yup.object().shape({
    movieName: yup.string().required("Enter the name to search"),
});

function Navbar() {
    let navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = (data) => {
        console.log(data.movieName);
        navigate(`/SearchResults`, { state: {name: data.movieName} })

    };

    const myStyles={
        "display":"flex", "justify-content":"space-between"
    }
    return (
        <div>
            <div className="navbar" >
                <div id="part3">
                    <div id="highlight"><h1  >RECOMMENDIFY</h1></div>
                </div>
                <div className="part2">
                    
                <div>
                <a className="links" onClick={() => { navigate(`/Upcoming`) }}>Upcoming</a>
                <a className="links" onClick={() => { navigate(`/Latest`) }}>Latest</a>
                <a className="links" onClick={() => { navigate(`/Home`) }}>Home</a>
                <a className="links" onClick={() => { navigate(`/ProfilePage`) }}>Profile</a>
                </div>

                    {/* <div class="dropdown">
                        <span class="btn-nav">Main Menu</span>
                        <div class="dropdown-content">
                            <a onClick={() => { navigate(`/Home`) }}>Home</a>
                            <a onClick={() => { navigate(`/Upcoming`) }}>Upcoming</a>
                            <a onClick={() => { navigate(`/Latest`) }}>Latest</a>
                            <a onClick={() => { navigate(`/ProfilePage`) }}>Profile</a>
                        </div>
                    </div> */}
                </div>
            </div>
            <form id="form"   onSubmit={handleSubmit(submitForm)}>
                <input 
                    id="search" 
                    class="search"         
                    type="text" 
                    name="movieName" 
                    placeholder="Search movie in database"
                    {...register('movieName')}
                />

                <input type="submit" id="submitBtn"/>

            </form>

                  

        </div>


    )
}

export default Navbar