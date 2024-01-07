import React, { useState, useEffect } from "react"
import "./App.css"
import "@aws-amplify/ui-react/styles.css"
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react"

import Calender from "./components/Calender"

const App = ({ signOut }) => {
  return (
    <View className="App">
      <div className="h-[50px] w-screen bg-[#f5f5f5] border-solid border-b-[1px] border-gray-300 flex justify-between items-center">
        <div className="ml-5 font-montserrat tracking-widest text-[#76CDC2] font-bold">DAYLY</div>
        <div onClick={signOut} className="mr-3 border-solid border-[1px] border-[#76CDC2] px-2 py-1 text-[#76CDC2] text-sm rounded-lg hover:cursor-pointer">Sign out</div>
      </div>
      <Calender />
    </View>
  )
}

export default withAuthenticator(App)
