import express from "express";
import {CreateNewWorkout, DeleteWorkout, GetWorkout, GetWorkouts, UpdateWorkout,} from "./workout.controller.js";
import {protect} from "../middleware/auth.middleware.js";
import {createNewWorkoutLog} from "./log/workout-log.controller.js";
import {getWorkoutLog} from "./log/get-workout-log.controller.js";
import {updateCompleteWorkoutLog} from "./log/update-workout-log.controller.js";

const router = express.Router()
router.route('/').post(protect,CreateNewWorkout).get(protect,GetWorkouts)

router
    .route('/:id')
    .get(protect,GetWorkout)
    .put(protect,UpdateWorkout)
    .delete(protect,DeleteWorkout)

router.route('/log/:id')
    .post(protect,createNewWorkoutLog)
    .get(protect, getWorkoutLog)

router.route('/log/complete/:id').patch(protect,updateCompleteWorkoutLog)
export default router