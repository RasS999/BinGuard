package com.fragments;

import android.Manifest;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import android.animation.ObjectAnimator;
import android.animation.AnimatorSet;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;

import android.speech.tts.TextToSpeech;
import android.speech.SpeechRecognizer;
import android.speech.RecognizerIntent;
import android.content.Intent;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.binguard.R;

import java.util.Locale;
import java.util.ArrayList;
import android.os.Handler;
import java.util.Arrays;
import java.util.List;

import okhttp3.*;
import org.json.JSONObject;
import java.io.IOException;

public class CommandFragment extends Fragment {

    private static final int REQUEST_RECORD_AUDIO = 101;

    private View view;
    private ImageView microphoneIcon;
    private Button btnFollowMe, btnSendToDock, btnShutdown;
    private DatabaseReference databaseReference;
    private FirebaseAuth auth;

    private TextToSpeech tts;
    private SpeechRecognizer speechRecognizer;
    private Intent speechIntent;

    private String lastCommand = "";

    // Confirmation box UI
    private CardView confirmationBox;
    private TextView tvCommandText;

    private final String OPENAI_API_KEY = "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"; // replace securely

    public CommandFragment() {}

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {

        view = inflater.inflate(R.layout.fragment_command, container, false);

        // Firebase
        databaseReference = FirebaseDatabase.getInstance().getReference();
        auth = FirebaseAuth.getInstance();

        // UI references
        microphoneIcon = view.findViewById(R.id.microphoneIcon);
        btnFollowMe = view.findViewById(R.id.btnFollowMe);
        btnSendToDock = view.findViewById(R.id.btnSendToDock);
        btnShutdown = view.findViewById(R.id.btnShutdown);

        // Confirmation box (TextView only, no buttons)
        confirmationBox = view.findViewById(R.id.confirmationBox);
        tvCommandText = view.findViewById(R.id.tvCommandText);

        // Check microphone permission
        checkMicPermission();

        // TextToSpeech setup
        tts = new TextToSpeech(getContext(), status -> {
            if (status == TextToSpeech.SUCCESS) {
                tts.setLanguage(Locale.US);
                speak("Hello Sir, I am Bin Guard. How may I assist you today?");
            }
        });

        // SpeechRecognizer setup
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(getContext());
        speechIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        speechIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        speechIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        speechRecognizer.setRecognitionListener(new SessionRecognitionListener());

        // Mic tap starts voice session
        microphoneIcon.setOnClickListener(v -> {
            if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.RECORD_AUDIO)
                    == PackageManager.PERMISSION_GRANTED) {
                startMicAnimation();
                startListening();
            } else {
                checkMicPermission();
            }
        });

        // Buttons for manual commands
        btnFollowMe.setOnClickListener(v -> sendCommandProfessional("Follow Me"));
        btnSendToDock.setOnClickListener(v -> sendCommandProfessional("Send to Dock"));
        btnShutdown.setOnClickListener(v -> sendCommandProfessional("Shutdown"));

        return view;
    }

    private void startListening() {
        if (speechRecognizer != null) {
            speechRecognizer.cancel(); // safely restart
            speechRecognizer.startListening(speechIntent);
        }
    }

    private void sendCommandProfessional(String command) {
        sendCommand(command); // Firebase first

        // Show command in confirmation box
        lastCommand = command;
        if (getActivity() != null) getActivity().runOnUiThread(() -> {
            tvCommandText.setText(command);
            confirmationBox.setVisibility(View.VISIBLE);
        });

        // AI response via ChatGPT
        JSONObject jsonBody = new JSONObject();
        try {
            jsonBody.put("model", "gpt-3.5-turbo");
            jsonBody.put("temperature", 0.7);
            jsonBody.put("messages", new org.json.JSONArray()
                    .put(new JSONObject()
                            .put("role", "user")
                            .put("content", "Reply professionally as a robot for command: " + command))
            );
        } catch (Exception e) { e.printStackTrace(); }

        OkHttpClient client = new OkHttpClient();
        RequestBody body = RequestBody.create(
                jsonBody.toString(),
                MediaType.parse("application/json; charset=utf-8")
        );

        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .addHeader("Authorization", "Bearer " + OPENAI_API_KEY)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override public void onFailure(Call call, IOException e) {
                e.printStackTrace();
                if (getActivity() != null) getActivity().runOnUiThread(() -> {
                    speak("Command sent, but AI failed to generate a response.");
                    showToast("Command executed: " + command);
                    stopMicSession();
                });
            }

            @Override public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String result = response.body().string();
                    try {
                        JSONObject json = new JSONObject(result);
                        String aiReply = json.getJSONArray("choices")
                                .getJSONObject(0)
                                .getJSONObject("message")
                                .getString("content");

                        if (getActivity() != null) getActivity().runOnUiThread(() -> {
                            speak(aiReply);
                            showToast("Command executed: " + command);
                            stopMicSession();
                        });
                    } catch (Exception e) { e.printStackTrace(); }
                } else {
                    if (getActivity() != null) getActivity().runOnUiThread(() -> {
                        speak("Command sent successfully.");
                        showToast("Command executed: " + command);
                        stopMicSession();
                    });
                }
            }
        });
    }

    private void sendCommand(String command) {
        if (auth.getCurrentUser() == null) {
            showToast("User not logged in");
            return;
        }
        DatabaseReference commandRef = databaseReference.child("Commands");
        commandRef.setValue(command)
                .addOnSuccessListener(aVoid -> showToast("Command sent: " + command))
                .addOnFailureListener(e -> showToast("Failed to send command"));
    }

    private void showToast(String message) {
        if (isAdded() && getContext() != null) {
            Toast.makeText(getContext(), message, Toast.LENGTH_SHORT).show();
        }
    }

    private void startMicAnimation() {
        ObjectAnimator scaleX = ObjectAnimator.ofFloat(microphoneIcon, "scaleX", 1f, 1.2f);
        ObjectAnimator scaleY = ObjectAnimator.ofFloat(microphoneIcon, "scaleY", 1f, 1.2f);
        ObjectAnimator pulse = ObjectAnimator.ofFloat(microphoneIcon, "alpha", 1f, 0.6f, 1f);
        pulse.setRepeatCount(ObjectAnimator.INFINITE);
        pulse.setDuration(800);
        AnimatorSet animatorSet = new AnimatorSet();
        animatorSet.playTogether(scaleX, scaleY, pulse);
        animatorSet.start();
        microphoneIcon.setTag(animatorSet);
    }

    private void stopMicAnimation() {
        AnimatorSet animatorSet = (AnimatorSet) microphoneIcon.getTag();
        if (animatorSet != null) animatorSet.cancel();
        microphoneIcon.setScaleX(1f);
        microphoneIcon.setScaleY(1f);
        microphoneIcon.setAlpha(1f);
    }

    private void stopMicSession() {
        stopMicAnimation();
        if (speechRecognizer != null) speechRecognizer.stopListening();
        lastCommand = "";
    }

    private void speak(String text) {
        if (tts != null) tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
    }

    private void checkMicPermission() {
        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(getActivity(),
                    new String[]{Manifest.permission.RECORD_AUDIO},
                    REQUEST_RECORD_AUDIO);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_RECORD_AUDIO) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                showToast("Microphone permission granted");
            } else {
                showToast("Microphone permission denied");
            }
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (tts != null) tts.shutdown();
        if (speechRecognizer != null) speechRecognizer.destroy();
    }

    private List<String> validCommands = Arrays.asList("Follow Me", "Send to Dock", "Shutdown");
    private Handler confirmationHandler = new Handler();
    private Runnable confirmationTimeoutRunnable;

    private class SessionRecognitionListener implements android.speech.RecognitionListener {
        @Override public void onReadyForSpeech(Bundle params) {}
        @Override public void onBeginningOfSpeech() {}
        @Override public void onRmsChanged(float rmsdB) {}
        @Override public void onBufferReceived(byte[] buffer) {}
        @Override public void onEndOfSpeech() {}

        @Override
        public void onError(int error) {
            startListening(); // restart silently on error
        }

        @Override
        public void onResults(Bundle results) {
            ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            if (matches == null || matches.isEmpty()) return;

            String spoken = matches.get(0).trim();
            processCommand(spoken); // Use the new processCommand method
        }

        @Override public void onPartialResults(Bundle partialResults) {}
        @Override public void onEvent(int eventType, Bundle params) {}
    }

    private void processCommand(String spokenCommand) {
        String correctedCommand = getClosestCommand(spokenCommand);

        if (correctedCommand == null) {
            // No valid match found, ask to try again
            speak("I didn't understand that. Please try again.");
            showToast("Invalid command. Try again.");
            startListening(); // Restart listening
            return;
        }

        if (spokenCommand.equalsIgnoreCase(correctedCommand)) {
            // Exact match, execute immediately
            executeCommand(correctedCommand);
        } else {
            // Suggest correction and ask for confirmation
            speak("Did you mean " + correctedCommand + "? Please say Yes or No.");
            showToast("Suggested command: " + correctedCommand);

            // Start listening for confirmation
            startListeningForConfirmation(correctedCommand);
        }
    }

    private String getClosestCommand(String spokenCommand) {
        String closestCommand = null;
        int minDistance = Integer.MAX_VALUE;

        for (String command : validCommands) {
            int distance = calculateLevenshteinDistance(spokenCommand.toLowerCase(), command.toLowerCase());
            if (distance < minDistance) {
                minDistance = distance;
                closestCommand = command;
            }
        }

        // Return the closest command if it's within a reasonable threshold
        return minDistance <= 3 ? closestCommand : null; // Adjust threshold as needed
    }

    private int calculateLevenshteinDistance(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];

        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = Math.min(
                            Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                            dp[i - 1][j - 1] + (a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1)
                    );
                }
            }
        }

        return dp[a.length()][b.length()];
    }

    private void startListeningForConfirmation(String correctedCommand) {
        // Set a timeout for confirmation
        confirmationTimeoutRunnable = () -> {
            speak("No response detected. Executing the command: " + correctedCommand);
            executeCommand(correctedCommand);
        };
        confirmationHandler.postDelayed(confirmationTimeoutRunnable, 5000); // 5 seconds timeout

        // Listen for "Yes" or "No"
        speechRecognizer.setRecognitionListener(new ConfirmationRecognitionListener(correctedCommand));
        startListening();
    }

    private void executeCommand(String command) {
        confirmationHandler.removeCallbacks(confirmationTimeoutRunnable); // Cancel timeout
        sendCommandProfessional(command); // Execute the command
        stopMicSession(); // End the session after successful execution
    }

    private class ConfirmationRecognitionListener implements android.speech.RecognitionListener {
        private String correctedCommand;

        public ConfirmationRecognitionListener(String correctedCommand) {
            this.correctedCommand = correctedCommand;
        }

        @Override public void onReadyForSpeech(Bundle params) {}
        @Override public void onBeginningOfSpeech() {}
        @Override public void onRmsChanged(float rmsdB) {}
        @Override public void onBufferReceived(byte[] buffer) {}
        @Override public void onEndOfSpeech() {}

        @Override
        public void onError(int error) {
            // If there's an error, fallback to timeout behavior
            confirmationTimeoutRunnable.run();
        }

        @Override
        public void onResults(Bundle results) {
            ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            if (matches == null || matches.isEmpty()) {
                confirmationTimeoutRunnable.run(); // Fallback to timeout behavior
                return;
            }

            String response = matches.get(0).trim().toLowerCase();
            if (response.equals("yes")) {
                executeCommand(correctedCommand);
            } else if (response.equals("no")) {
                speak("Okay, please try again.");
                startListening(); // Restart listening
            } else {
                confirmationTimeoutRunnable.run(); // Fallback to timeout behavior
            }
        }

        @Override public void onPartialResults(Bundle partialResults) {}
        @Override public void onEvent(int eventType, Bundle params) {}
    }
}
