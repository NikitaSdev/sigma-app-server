import express from "express";
import {CreateExercise, DeleteExercise, getExercises, UpdateExercise} from "./exercise.controller.js";
import {protect} from "../middleware/auth.middleware.js";
import {createNewExerciseLog} from "./log/exercise-log.controller.js";
import {getExerciseLog} from "./log/get-exercise-log.controller.js";
import {completeExerciseLog, updateExerciseLogTime} from "./log/update-exercise-log.controller.js";



const router = express.Router()
router.route('/').post(protect,CreateExercise).get(protect,getExercises)
router.route('/:id').delete(protect,DeleteExercise)
router.route('/:id').put(protect,UpdateExercise)

router.route('/log/:id')
    .post(protect,createNewExerciseLog)
    .get(protect,getExerciseLog)


router.route('/log/complete/:id').patch(protect,completeExerciseLog)
router.route('/log/time/:id').put(protect,updateExerciseLogTime)
export default router