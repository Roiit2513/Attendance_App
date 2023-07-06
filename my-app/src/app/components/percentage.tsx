"use client";
import { useAppSelector } from "@/redux/store";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {Chart as ChartJS,  ArcElement} from "chart.js/auto";

import { collection, addDoc, getDocs, where, query, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useAuth } from "@/firebase/auth";


export default function Percentage() {
    const currDate = useAppSelector((state) => state.currDateReducer.value.DateString);
    const { authUser, isLoading } = useAuth();
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState<any[]>([]);

    ChartJS.register(ArcElement);

    useEffect(() => {
        if (!!authUser.email) {
            fetchData();
        }
    }, [])

    const fetchData = async () => {
        try {
            setLoader(true);
            const q = query(collection(db, 'subjects'), where("owner", "==", authUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const document = doc.data();
                setTotal(document.total);

            });
            setLoader(false);
        } catch (error) {
            console.log("An Error occured :", error);
        }
    }
    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart: any, args: any, pluginOptions: any){
            const { ctx , data } = chart;
            ctx.save();
            ctx.font = 'bold 15px sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseLine = 'center';
            ctx.fillText(data.datasets[0].data[0] + "%", chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        }
    }
    return(
        <div className="flex justify-around w-screen bg-stone-800">
            {
                total.map((obj) => {
                    return(
                        <div key={obj.subject} className="flex flex-col m-4 justify-center items-center w-1/12">
                            <Doughnut data={{labels: [], datasets: [{label: obj.subject, data: [Math.round(obj.percentage), 100-Math.round(obj.percentage)], backgroundColor: ["white", "rgb(41 37 36)"], borderColor: ["rgb(41 37 36)"],}]}} height={100} width={100} plugins={[textCenter]}/>
                            <p className="text-center mt-2 text-white">{obj.subject}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}