"use client";

import React, { useState } from "react";

const EventsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const events = [
    {
      id: 1,
      image: "/placeholder.jpg",
      name: "EVENT NAME 1",
      date: "XX/XX/XXXX",
      description: "Short description of event. lorem ipsum lorem ipsum lorem ipsem"
    },
    {
      id: 2,
      image: "/placeholder.jpg",
      name: "EVENT NAME 2",
      date: "XX/XX/XXXX",
      description: "Short description of event. lorem ipsum lorem ipsum lorem ipsem"
    },
    {
      id: 3,
      image: "/placeholder.jpg",
      name: "EVENT NAME 3",
      date: "XX/XX/XXXX",
      description: "Short description of event. lorem ipsum lorem ipsum lorem ipsem"
    },
    {
      id: 4,
      image: "/placeholder.jpg",
      name: "EVENT NAME 4",
      date: "XX/XX/XXXX",
      description: "Short description of event. lorem ipsum lorem ipsum lorem ipsem"
    },
    {
      id: 5,
      image: "/placeholder.jpg",
      name: "EVENT NAME 5",
      date: "XX/XX/XXXX",
      description: "Short description of event. lorem ipsum lorem ipsum lorem ipsem"
    }
  ];
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (events.length - 2));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? events.length - 3 : prev - 1));
  };
  
  const styles = {
    eventsSection: {
      padding: "3rem 0",
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
      position: "relative"
    } as React.CSSProperties,
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      textTransform: "uppercase",
      paddingLeft: "1rem"
    } as React.CSSProperties,
    divider: {
      height: "4px",
      backgroundColor: "#002D72",
      width: "100%",
      marginBottom: "1.5rem"
    } as React.CSSProperties,
    subtitle: {
      fontSize: "1.25rem",
      fontStyle: "italic",
      marginBottom: "2rem",
      lineHeight: "1.5",
      paddingLeft: "1rem",
      paddingRight: "1rem"
    } as React.CSSProperties,
    carouselWrapper: {
      position: "relative",
      width: "100%",
      padding: "0 50px"
    } as React.CSSProperties,
    carouselContainer: {
      position: "relative",
      width: "100%",
      overflow: "hidden"
    } as React.CSSProperties,
    carousel: {
      display: "flex",
      gap: "2rem",
      transition: "transform 0.5s ease",
      transform: `translateX(-${currentSlide * 33.333}%)`
    } as React.CSSProperties,
    eventCard: {
      flex: "0 0 calc(33.333% - 1.33rem)",
      minWidth: "calc(33.333% - 1.33rem)"
    } as React.CSSProperties,
    eventImage: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      marginBottom: "1rem"
    } as React.CSSProperties,
    eventHeader: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem"
    } as React.CSSProperties,
    eventName: {
      fontWeight: "bold",
      fontSize: "1.2rem"
    } as React.CSSProperties,
    eventDate: {
      fontSize: "1.2rem"
    } as React.CSSProperties,
    eventDescription: {
      marginBottom: "1.5rem",
      lineHeight: "1.5"
    } as React.CSSProperties,
    viewMoreButton: {
      backgroundColor: "#0078d7",
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      fontWeight: "600",
      fontSize: "1rem",
      cursor: "pointer",
      textTransform: "uppercase",
      display: "inline-block"
    } as React.CSSProperties,
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "1.5rem",
      color: "#0078d7",
      zIndex: "1",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "50%",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    } as React.CSSProperties,
    prevButton: {
      left: "5px"
    } as React.CSSProperties,
    nextButton: {
      right: "5px" 
    } as React.CSSProperties
  };

  return (
    <section style={styles.eventsSection}>
      <h2 style={styles.title}>EVENTS</h2>
      <div style={styles.divider}></div>
      <p style={styles.subtitle}>
        Find events in the Boston area to connect with people, find
        the help you need, or just have fun.
      </p>
      
      <div style={styles.carouselWrapper}>
        <button 
          style={{...styles.navButton, ...styles.prevButton}} 
          onClick={prevSlide}
          aria-label="Previous events"
        >
          &lt;
        </button>
        
        <div style={styles.carouselContainer}>
          <div style={styles.carousel}>
            {events.map((event) => (
              <div key={event.id} style={styles.eventCard}>
                <img 
                  src={event.image} 
                  alt={event.name} 
                  style={styles.eventImage} 
                />
                <div style={styles.eventHeader}>
                  <span style={styles.eventName}>{event.name}</span>
                  <span style={styles.eventDate}>{event.date}</span>
                </div>
                <p style={styles.eventDescription}>{event.description}</p>
                <button style={styles.viewMoreButton}>VIEW MORE</button>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          style={{...styles.navButton, ...styles.nextButton}} 
          onClick={nextSlide}
          aria-label="Next events"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default EventsSection;
