import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);
  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("This error happened: ", err));
  }, [spotifyApi, playlistId]);
  console.log(playlist)
  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black-400 bg-black space-x-3 opacity-90 p-1 pr-2 hover:opacity-80 cursor-pointer rounded-full">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={` flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}
      >
        <img className="h-44 w-44 shadow-2xl"
        src={playlist?.images?.[0]?.url}
        alt=""
        />

       <div>
         <p>PLAYLIST</p> {/* First value is always mobile value */}
         <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1> 
       </div>
      </section>
      <div>
        <Songs/>
      </div>
    </div>
  );
}

export default Center;
