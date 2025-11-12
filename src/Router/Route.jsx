import { createBrowserRouter } from "react-router";
import PrivateRoute from "../Private/PrivateRoute";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import ForgetEmailPage from "../Components/ForgetEmailPage";
import Root from "../Components/Root";
import Errorpage from "./Errorpage";
import Profile from "../Components/Profile";
import Home from "../Components/Home/Home";
import AddModel from "../Components/AddmodelByPost/addModel";
import ModelDetails from "../Components/ModelDetails/ModelDetails";
import UpdateCard from "../Components/Update/UpdateCard";
import LatestUpdatedModel from "../Components/LatestUpdatedModel/LatestUpdatedModel";
import MyModel from "../Components/MyModelpage/MyModel";
import MyDownloadpage from "../Components/MyDownloadPage/MyDownloadpage";
import Homepages from "../Pages/Homepages";





export const router = createBrowserRouter ([
    {
      path: '/',
      element:  <Root></Root>,
    children:[

        {
            path:'/',
            element:<Homepages></Homepages>

        },

        {
            path: '/home',
            element: <Home></Home>,
            loader: ()=>fetch('http://localhost:3000/models')

        },

        {
              path:'/update-models/:id',
            element:<PrivateRoute>
                <UpdateCard></UpdateCard>
            </PrivateRoute>,


        },
        
        {
            path:'/models/:id',
            element:<PrivateRoute>
                <ModelDetails></ModelDetails>
            </PrivateRoute>,
            
        },
        {
            path:'/myModels',
            element:<PrivateRoute>
                <MyModel></MyModel>
            </PrivateRoute>,
            
        },
        {
            path:'/my-download',
            element:<PrivateRoute>
                <MyDownloadpage></MyDownloadpage>
            </PrivateRoute>,
            
        },
        
        {
            path:'/models/:id',
            element:<PrivateRoute>
                <ModelDetails></ModelDetails>
            </PrivateRoute>,
            
        },

        {
            path: '/models/Latest-updates',
            element: <LatestUpdatedModel></LatestUpdatedModel>

        },



        
      
       
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
        {
            path: '/addModel',
            element:<AddModel></AddModel>
        },
        {
              path:'/signin',
            element:<SignIn></SignIn>

        },
        {
            path:'/myProfile',
            element: <PrivateRoute>
                <Profile></Profile>
            </PrivateRoute>

        },
       
        
         {
        path: '/forget-password',
        element: <ForgetEmailPage></ForgetEmailPage>
      },

      
        {
            path: '*',
            element:<Errorpage></Errorpage>
        }
        
       
        
    ]
    }
])