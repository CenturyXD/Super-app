<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class EventController extends Controller
{
    //
    public function saveevent(Request $request)
    {

        // Validate the request data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create a new event
        try {
            $event = Event::create([
                'title' => $request->title,
                'description' => $request->description,
                'date' => $request->date,
                'time' => $request->time,
            ]);

            return response()->json([
                'message' => 'Event saved successfully',
                'event' => $event,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Event save failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getevents()
    {
        $events = Event::where('status', 'active')->get();

        return response()->json([
            'events' => $events,
        ], 200);
    }

    public function updateevent(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the event
        $event = Event::find($request->id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found',
            ], 404);
        }

        // Update the event
        try {
            $event->title = $request->title;
            $event->description = $request->description;
            $event->date = $request->date;
            $event->time = $request->time;
            $event->save();

            return response()->json([
                'message' => 'Event updated successfully',
                'event' => $event,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Event update failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteevent(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Find the event
        $event = Event::find($request->id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found',
            ], 404);
        }

        // Delete the event
        try {
            $event->status = 'deactive';
            $event->save();

            return response()->json([
                'message' => 'Event deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Event delete failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
