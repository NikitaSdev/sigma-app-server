import asyncHandler from "express-async-handler";
import {prisma} from "../prisma.js";

export const CreateExercise = asyncHandler(async(req,res) => {
    const{name,times, iconPath} = req.body
    const exercise = await prisma.exercise.create({
        data:{
           name,times,iconPath
        }
    })
    res.json(exercise)
})

export const DeleteExercise = asyncHandler(async (req,res) => {
    try{
        const deleteExercise = await prisma.exercise.delete({
            where:{
                id:+req.params.id
            }
        })
        res.json({deleteExercise,message:"exercise deleted"})
    }catch(e){
        res.status(404)
        throw new Error('Exercise not found')
    }
})
export const UpdateExercise = asyncHandler(async (req,res) => {
    const{name,times, iconPath} = req.body
    try{
        const updated = await prisma.exercise.update({
            where:{
                id:Number(req.params.id)
            },data:{
                name,
                times,
                iconPath
            }
        })
        res.json(updated)
    }catch (e){
        res.status(404)
        throw new Error('Exercise not found')
    }

})
export const getExercises = asyncHandler(async(req,res) => {
    const exercises = await prisma.exercise.findMany({
        orderBy:{
            createdAt:'desc'
        }
    })
    res.json(exercises)
})