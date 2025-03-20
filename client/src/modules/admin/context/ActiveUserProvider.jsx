import React, { createContext, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { useInterval } from "react-use";

export const ActiveUserContext = createContext();

export const ActiveUserProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    return parseInt(localStorage.getItem("userPoints")) || 0;
  });

  const activeTimeRef = useRef(0);
  const lastActivityRef = useRef(Date.now());
  const isTabActive = useRef(true);

  // Track user activity globally
  const handleUserActivity = debounce(() => {
    if (isTabActive.current) {
      lastActivityRef.current = Date.now();
    }
  }, 500);

  // Detect if tab is active
  const handleVisibilityChange = () => {
    isTabActive.current = !document.hidden;
  };

  useEffect(() => {
    const events = [
      "mousemove", "mousedown", "mouseup", "click", "dblclick", "wheel",
      "keydown", "keyup",
      "touchstart", "touchmove", "touchend",
      "scroll", "resize", "focus", "blur",
      "contextmenu", "pointermove", "pointerdown", "pointerup"
    ];

    events.forEach(event => window.addEventListener(event, handleUserActivity));
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      events.forEach(event => window.removeEventListener(event, handleUserActivity));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Check activity every 1 minute
  useInterval(() => {
    const now = Date.now();

    // Only count time if the tab is active
    if (isTabActive.current && now - lastActivityRef.current < 60000) {
      activeTimeRef.current += 60; // Increase active time by 1 minute
    } else {
      activeTimeRef.current = 0; // Reset if inactive
    }

    if (activeTimeRef.current >= 60) { // If user is active for 1 min
      setPoints(prev => {
        const newPoints = prev + 10;
        localStorage.setItem("userPoints", newPoints); // Store points persistently
        console.log(`User has been active for 1 minute, total points: ${newPoints}`);
        return newPoints;
      });
      activeTimeRef.current = 0; // Reset active time
    }
  }, 60000); // Runs every 1 minute

  return (
    <ActiveUserContext.Provider value={{ points }}>
      {children}
    </ActiveUserContext.Provider>
  );
};
