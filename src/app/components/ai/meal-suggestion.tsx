"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function AIMealSuggestion() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const generateSuggestion = async () => {
    setLoading(true);
    // Here you would integrate with OpenAI API
    // For now, we'll simulate a response
    setTimeout(() => {
      setSuggestion(
        "Based on your profile and goals, I recommend:\n\n" +
        "Breakfast: Oatmeal with berries and nuts (350 cal)\n" +
        "Lunch: Grilled chicken salad with quinoa (450 cal)\n" +
        "Dinner: Baked salmon with vegetables (400 cal)"
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">AI Meal Suggestions</h3>
      <p className="text-muted-foreground mb-4">
        Get personalized meal suggestions based on your health goals and preferences.
      </p>
      <Button
        onClick={generateSuggestion}
        disabled={loading}
        className="w-full mb-4"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate Meal Plan
      </Button>
      {suggestion && (
        <div className="whitespace-pre-line bg-sky-50 p-4 rounded-lg">
          {suggestion}
        </div>
      )}
    </Card>
  );
}