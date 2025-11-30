import { useState } from 'react'
import { supabase, isSupabaseConfigured } from './lib/supabase'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    plusOne: false,
    guestName: '',
    dietaryRequirements: false,
    dietaryRequirementsText: '',
    guestDietaryRequirements: false,
    guestDietaryRequirementsText: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isSupabaseConfigured()) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Supabase is not configured. Please check your environment variables.' 
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_number: formData.phoneNumber || null,
            plus_one: formData.plusOne,
            guest_name: formData.guestName || null,
            dietary_requirements: formData.dietaryRequirements,
            dietary_requirements_text: formData.dietaryRequirementsText || null,
            guest_dietary_requirements: formData.guestDietaryRequirements,
            guest_dietary_requirements_text: formData.guestDietaryRequirementsText || null
          }
        ])
        .select()

      if (error) throw error

      setSubmitStatus({ type: 'success', message: 'Thank you! Your RSVP has been submitted.' })
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        plusOne: false,
        guestName: '',
        dietaryRequirements: false,
        dietaryRequirementsText: '',
        guestDietaryRequirements: false,
        guestDietaryRequirementsText: ''
      })
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Sorry, there was an error submitting your RSVP. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app">
      <div className="invite-container">
        <div className="hero-section">
          <div className="venue-image-container">
            <img 
              src="/664f192b75b95.jpeg" 
              alt="Cafe Parisien City Hall Belfast"
              className="venue-image"
            />
            <div className="venue-overlay"></div>
          </div>
          
          <div className="couple-photo">
            <img 
              src="/573854774_10172425787175467_6061678781317885022_n.jpg" 
              alt="Amy & Andy"
              className="photo-circle"
            />
          </div>
        </div>
        
        <h1 className="couple-names">Amy <span className="ampersand">&</span> Andy</h1>
        
        <div className="divider-elegant">
          <div className="divider-line"></div>
          <div className="divider-flourish"></div>
          <div className="divider-line"></div>
        </div>
        
        <p className="announcement">We're Engaged!</p>
        <p className="invitation-text">Come join us for a night of food, drinks, and music!</p>
        
        <div className="details">
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM5 7V6h14v1H5z" fill="currentColor"/>
                <path d="M7 11h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z" fill="currentColor"/>
              </svg>
            </div>
            <div className="detail-content">
              <h3>Date</h3>
              <p>Friday, 2nd January 2026</p>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
              </svg>
            </div>
            <div className="detail-content">
              <h3>Time</h3>
              <p>7:00 PM</p>
            </div>
          </div>
          
          <div className="detail-item location-item">
            <div className="detail-icon-wrapper">
              <svg className="detail-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              </svg>
            </div>
            <div className="detail-content">
              <h3>Location</h3>
              <p className="location-name">Cafe Parisien</p>
              <p className="location-address">City Hall Belfast</p>
            </div>
          </div>
        </div>
        
        <div className="rsvp-section">
          <div className="rsvp-header">
            <div className="rsvp-line"></div>
            <h2>RSVP</h2>
            <div className="rsvp-line"></div>
          </div>
          <p className="rsvp-text">Please let us know if you can join us!</p>
          
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g., +44 123 456 7890"
              />
            </div>
            
            <div className="form-checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="plusOne"
                  checked={formData.plusOne}
                  onChange={handleChange}
                />
                <span>I will be bringing a guest</span>
              </label>
            </div>
            
            {formData.plusOne && (
              <div className="form-group">
                <label htmlFor="guestName">Guest Name</label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  placeholder="Enter your guest's name"
                  required={formData.plusOne}
                />
              </div>
            )}
            
            <div className="form-checkboxes" style={{ marginTop: formData.plusOne ? '1.5rem' : '0' }}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryRequirements"
                  checked={formData.dietaryRequirements}
                  onChange={handleChange}
                />
                <span>I have dietary requirements or allergies</span>
              </label>
              
              {formData.plusOne && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="guestDietaryRequirements"
                    checked={formData.guestDietaryRequirements}
                    onChange={handleChange}
                  />
                  <span>My guest has dietary requirements or allergies</span>
                </label>
              )}
            </div>
            
            {formData.dietaryRequirements && (
              <div className="form-group">
                <label htmlFor="dietaryRequirementsText">Please specify your dietary requirements or allergies</label>
                <textarea
                  id="dietaryRequirementsText"
                  name="dietaryRequirementsText"
                  value={formData.dietaryRequirementsText}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g., Vegetarian, Gluten-free, Nut allergy, etc."
                />
              </div>
            )}
            
            {formData.guestDietaryRequirements && (
              <div className="form-group">
                <label htmlFor="guestDietaryRequirementsText">Please specify your guest's dietary requirements or allergies</label>
                <textarea
                  id="guestDietaryRequirementsText"
                  name="guestDietaryRequirementsText"
                  value={formData.guestDietaryRequirementsText}
                  onChange={handleChange}
                  rows="3"
                  placeholder="e.g., Vegetarian, Gluten-free, Nut allergy, etc."
                />
              </div>
            )}
            
            {submitStatus && (
              <div className={`submit-message submit-message-${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="rsvp-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>
        
        <p className="closing">We can't wait to celebrate with you!</p>
        
        <div className="footer-hearts">
          <svg className="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#D4AF37" strokeWidth="1.5"/>
          </svg>
          <svg className="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#D4AF37" strokeWidth="1.5"/>
          </svg>
          <svg className="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#D4AF37" strokeWidth="1.5"/>
          </svg>
          <svg className="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#D4AF37" strokeWidth="1.5"/>
          </svg>
          <svg className="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" stroke="#D4AF37" strokeWidth="1.5"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default App

