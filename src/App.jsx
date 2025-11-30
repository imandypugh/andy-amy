import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    plusOne: false,
    dietaryRequirements: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add submission endpoint when provided
    console.log('Form submitted:', formData)
    // Placeholder - will be updated with actual endpoint
    alert('RSVP submitted! (Form submission endpoint to be added)')
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
              alt="Andy & Amy"
              className="photo-circle"
            />
          </div>
        </div>
        
        <h1 className="couple-names">Andy <span className="ampersand">&</span> Amy</h1>
        
        <div className="divider-elegant">
          <div className="divider-line"></div>
          <div className="divider-flourish"></div>
          <div className="divider-line"></div>
        </div>
        
        <p className="announcement">We're Engaged!</p>
        <p className="invitation-text">You're cordially invited to celebrate with us</p>
        
        <div className="details">
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <div className="detail-icon">📅</div>
            </div>
            <div className="detail-content">
              <h3>Date</h3>
              <p>Friday, January 2nd, 2026</p>
            </div>
          </div>
          
          <div className="detail-item">
            <div className="detail-icon-wrapper">
              <div className="detail-icon">🕐</div>
            </div>
            <div className="detail-content">
              <h3>Time</h3>
              <p>6:00 PM</p>
            </div>
          </div>
          
          <div className="detail-item location-item">
            <div className="detail-icon-wrapper">
              <div className="detail-icon">☕</div>
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
            
            <div className="form-checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="plusOne"
                  checked={formData.plusOne}
                  onChange={handleChange}
                />
                <span>I will bring a +1</span>
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="dietaryRequirements"
                  checked={formData.dietaryRequirements}
                  onChange={handleChange}
                />
                <span>I have dietary requirements or allergies</span>
              </label>
            </div>
            
            <button type="submit" className="rsvp-button">
              Submit RSVP
            </button>
          </form>
        </div>
        
        <p className="closing">We can't wait to celebrate with you!</p>
        
        <div className="footer-hearts">
          <span>💕</span>
          <span>💖</span>
          <span>💝</span>
          <span>💗</span>
          <span>💕</span>
        </div>
      </div>
    </div>
  )
}

export default App

