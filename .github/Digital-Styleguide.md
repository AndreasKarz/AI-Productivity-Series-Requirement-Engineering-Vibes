# Digital Style Guide

> **Version:** 1.0 | **Last Updated:** February 17, 2026  
> A comprehensive guide for designing consistent, accessible, and user-centered digital experiences.

---

## 1. Design Principles

Our design philosophy is built on six core principles that guide all digital design decisions:

### 1.1 Customer Centricity
**Focus on the user and all else shall follow.**

This principle is the highest priority across all digital activities. When conflicting situations arise between different paradigms, customer-centricity acts as the primary decision-making framework and always overrules other paradigms, principles, and rules.

### 1.2 Consistency
Form, function, visuals, language, and content must be structured identically across all platforms, devices, and digital touchpoints. All user interaction elements must follow the same patterns to ensure:
- Easy learning and adoption
- Simplified execution of complex tasks
- Clear and unified brand appearance
- Strengthened brand perception

### 1.3 Transparency
Gain trust by being absolutely honest and transparent in all user situations:

- **Products:** Be transparent about advantages/disadvantages of individual products for each customer situation
- **Information:** Ensure users have all needed information in their context and understand its source and meaning
- **Processes:** Users must understand why they perform activities and their effect on achieving goals

### 1.4 Simplicity
The decision-making time increases with the number of available choices.

- Reduce functionality, services, and information to the minimum needed by users
- Limit interaction items to maximum 7 at a time (users can process 5–9 items)
- Keep navigation items visible on screen to a minimum

### 1.5 Joy of Use
Provide a digital experience that is joyful to use while remaining professional:
- Generate joyful moments through micro-interactions
- Use creative and supportive imagery
- Employ interesting structure, dramaturgy, and rhythm in content

### 1.6 Personalization
Offer contextual experiences that deliver content and functionality tailored to individual user needs and interests, creating deeper connections with end-users.

---

## 2. Color System

### 2.1 Color Palette Overview

The color system consists of two main palettes that work together to create visual impact, convey proper messaging, and ensure clear interactions.

#### Primary Colors

| Color | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| **Red** | #D82034 | 216, 32, 52 | Accent color |
| **Black** | #000000 | 0, 0, 0 | Headlines on images |
| **White** | #FFFFFF | 255, 255, 255 | Text & background |

#### Gray Tones (Primary Palette)

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| Anthracite | #353535 | 53, 53, 53 | Main text color |
| Grey | #515151 | 81, 81, 81 | Secondary text |
| Grey 01 | #666666 | 102, 102, 102 | UI structure |
| Grey 02 | #808080 | 128, 128, 128 | UI structure |
| Grey 03 | #B4B4B4 | 180, 180, 180 | UI structure |
| Grey 04 | #D2D2D2 | 210, 210, 210 | UI structure |
| Grey 05 | #E5E5E5 | 229, 229, 229 | UI structure |
| Grey 06 | #F4F4F4 | 244, 244, 244 | Main background |
| Grey 07 | #F9F9F9 | 249, 249, 249 | Light backgrounds |

#### Secondary Colors (Warm)

| Color | Hex Code | RGB |
|-------|----------|-----|
| Bordeaux | #A11C36 | 161, 28, 54 |
| Flamingo | #FD8182 | 253, 129, 130 |
| Cherryblossom | #ECBDAB | 236, 189, 171 |
| Terracotta | #C45417 | 196, 84, 23 |
| Sunflower | #FCC52D | 252, 197, 45 |
| Desert | #DDBD88 | 221, 189, 136 |

#### Secondary Colors (Cold)

| Color | Hex Code | RGB |
|-------|----------|-----|
| Forest | #607E46 | 96, 126, 70 |
| Lime | #CCD457 | 204, 212, 87 |
| Pistachio | #CBD38F | 203, 211, 143 |
| Sea | #15847B | 21, 132, 123 |
| Sky | #83CEC5 | 131, 206, 197 |
| Stone | #9DBDBC | 157, 189, 188 |

#### Status Color

| Color | Hex Code | RGB | Purpose |
|-------|----------|-----|---------|
| Green | #018803 | 1, 136, 3 | Status indication only |

> ⚠️ **Important:** Use green only for status indication. Do not use for emotional elements.

### 2.2 Color Usage Rules

**The 90/10 Rule:**
- Maintain a ratio of 90% primary colors to 10% secondary colors
- Focus should remain on primary colors with strong white space
- Use secondary colors to create special contrast for information or illustrations

**Warm vs. Cold Colors:**
- Do not mix warm and cold secondary colors

**Allowed Font Color Combinations:**
- Primary colors work with their designated backgrounds
- Secondary colors have specific contrast requirements
- Always verify WCAG AA compliance for text elements

---

## 3. Typography

### 3.1 Typefaces

#### Web & Desktop (Open Source)
- **Headings:** Merriweather Regular/Bold (free, open-source serif font)
- **Body Text:** Source Sans Pro Regular/Light (free, open-source sans-serif)
- **Decorative/Quotes:** Merriweather

#### Mobile Applications
- **Android:** Roboto (native, no replacement needed)
- **iOS:** San Francisco (native, no replacement needed)

#### Fallback Typefaces
- Arial (fallback for Source Sans Pro)
- Georgia (fallback for Merriweather)

#### Font Licensing
**All typefaces are free and open-source:**
- **Merriweather:** Licensed under SIL Open Font License (OFL)
- **Source Sans Pro:** Licensed under SIL Open Font License (OFL)
- **Roboto:** Licensed under Apache License 2.0
- Available via Google Fonts and other CDNs

#### Rationale: Free Alternative to ITC Legacy

| Aspect | ITC Legacy (Original) | Merriweather (Free) |
|--------|---------------------|-------------------|
| **Type** | Serif (Paid) | Serif (Open Source) |
| **License** | Proprietary | SIL OFL 1.1 |
| **Cost** | €/$ per license | Free |
| **Weight Availability** | Book (400) | Regular, Bold (400, 700) |
| **Design Style** | Classical, elegant | Warm, humanist |
| **Legibility** | Excellent | Excellent |
| **Web Performance** | Variable | Optimized |
| **Commercial Use** | Licensed | Unrestricted |
| **Target Use** | Headings, quotes | Headings, quotes |

**Why Merriweather?**
- Professional and elegant appearance comparable to ITC Legacy
- Excellent legibility on screens and print
- Open-source ensures sustainable, long-term usage
- No licensing costs or restrictions
- Warm, humanist characteristics maintain brand feel
- Extensive glyph support for multilingual content

### 3.2 Desktop Typography Hierarchy

#### Headings

| Type | Font | Size | Line Height |
|------|------|------|-------------|
| Heading 1 | Merriweather | 60px | 66px (1.09em) |
| Heading 2 | Merriweather | 60px | 66px (1.1em) |
| Heading 3 | Merriweather | 40px | 44px (1.1em) |
| Heading 4 | Merriweather | 26px | 28px (1.08em) |
| Heading 5 | Source Sans Pro | 20px | 22px (1.1em) |

#### Body Text

| Type | Font | Size | Line Height |
|------|------|------|-------------|
| Body Text 1 | Source Sans Pro | 20px | 28px (1.2em) |
| Body Text 2 | Source Sans Pro | 16px | 22px (1.375em) |
| Body Text 2a | Source Sans Pro | 16px | 26px (1.625em) |
| Meta Text 1 | Source Sans Pro Light | 14px | 16px (1.143em) |
| Meta Text 2 | Source Sans Pro Regular | 12px | 16px (1.333em) |

#### Special Elements

| Type | Font | Size | Line Height |
|------|------|------|-------------|
| Button & Link | Merriweather | 16px | 18px (1.125em) |
| Quote Large | Merriweather | 40px | 44px (1.1em) |
| Quote Small | Merriweather | 26px | 36px (1.38em) |
| Elevator Pitch Body | Merriweather | 16px | 22px (1.375em) |
| Abstract Heading | Merriweather | 32px | 42px (1.3125em) |
| Abstract Body | Source Sans Pro Light | 20px | 32px (1.6em) |

### 3.3 Mobile Typography Hierarchy

| Type | Font | Size | Line Height |
|------|------|------|-------------|
| Heading 1 | Merriweather | 40px | 44px (1.1em) |
| Heading 2 | Merriweather | 32px | 36px (1.125em) |
| Heading 3 | Merriweather | 26px | 28px (1.08em) |
| Heading 4 | Merriweather | 20px | 22px (1.1em) |
| Heading 5 | Source Sans Pro | 18px | 20px (1.11em) |
| Body Text | Source Sans Pro | 16px | 22px (1.375em) |

---

## 4. Visual Elements

### 4.1 Logo System

#### Primary Brand Mark
- At the heart of the corporate design
- All applications must be branded appropriately
- Must appear on white background
- The key symbol should not be used standalone as icon, avatar, button, or decoration

#### Logo Protection Zone
- Mandatory white area surrounding the logo on all four sides
- No other elements allowed in this zone
- Ensures clarity and visibility in every context

#### Placement Rules
- **Desktop:** Top right corner of header in landscape format
- **Mobile:** Adapted placement maintaining proportions and rules
- **Background:** Always on white background

### 4.2 Sub-brands
Separate logo versions with additional sublines are used for:
- Different product lines
- Regional variations
- Specialized business units

### 4.3 Imagery
- Supports emotional storytelling
- Maintains visual consistency across platforms
- Follows mood and tone guidelines
- Includes mood images for context and atmosphere

### 4.4 Iconography
- Consistent icon style across all digital products
- Semantic meaning clearly conveyed
- Follows size and spacing guidelines
- Part of cohesive visual system

### 4.5 Grid System
- Establishes structure and alignment
- Ensures responsive design across devices
- Maintains visual hierarchy
- Supports consistency in layout

---

## 5. UI Components

A comprehensive library of reusable components for building consistent interfaces:

### 5.1 Available Components

#### Content Organization
- **Accordion:** Presents large content amounts in condensed format
  - Used for secondary content like FAQs
  - Default collapsed state recommended
  - Avoid excessive content to prevent user dissatisfaction
  - Supports both standalone and grouped variations
  
- **Tabs:** Switch between related content views
- **Cards:** Organize and display related information
- **Divider:** Visual separation between sections
- **Tables:** Structured data presentation

#### Navigation & Actions
- **Navigation:** Primary and secondary navigation patterns
- **Action Bar:** Contextual actions and links
- **Buttons:** Multiple states and variations
- **Links:** Text links and call-to-action elements

#### Forms & Input
- **Form Elements:** Inputs, selects, checkboxes, radio buttons
- **Text Fields:** Single and multi-line inputs
- **Validation:** Status and error messaging

#### Feedback & Status
- **Notification:** Alert, success, warning, error messages
- **Overlay:** Modal dialogs and overlays
- **Status Indicators:** Loading, success, error states

#### Media & Display
- **Gallery:** Image layouts and presentations
- **Mood Image:** Context and atmosphere elements
- **Testimonial:** User/customer feedback display

#### Specialized
- **Header & Footer:** Page structure components
- **Social Sharing:** Share buttons and integration
- **Calculators:** Interactive tool components

### 5.2 Component Usage Guidelines
- Each component has specific use cases
- Consistency in styling and behavior required
- Mobile and desktop variations provided

---

## 6. Design Patterns & Examples

### 6.1 Website Structure
- Marketing activities prominently placed
- Focused access to product and service offerings
- Guided navigation to targeted content

### 6.2 Homepage Design
- Flexible structure adaptable to seasons
- Partial personalization based on user needs
- Featured content area for seasonal offers
- Quick links for key user actions
- Product categories with unique, recognizable icons
- Marketing campaign promotion areas
- Trust elements and social proof
- Purpose-driven content placement
- Media release sections
- Comprehensive footer with company information

### 6.3 Product Pages
- Detailed product information
- Related product links
- Conversion-focused mood images
- Appointment booking capabilities
- Feature highlights and benefits
- Comparison tools

### 6.4 Forms & Interactions
- Contact forms with clear field hierarchy
- Progressive disclosure of optional fields
- Clear error messaging and validation
- Multi-step forms with progress indication

### 6.5 Specialized Pages
- Customer Portal: Personalized user experience
- Calculators: Interactive financial/planning tools
- Content Hubs: Organized content discovery

---

## 7. Responsive Design

### 7.1 Breakpoints & Adaptation
- **Desktop:** Full-width optimized layout
- **Tablet:** Flexible multi-column layout
- **Mobile:** Single-column, touch-optimized layout

### 7.2 Mobile-First Considerations
- Reduced font sizes per typography hierarchy
- Touch targets minimum 44x44 pixels
- Simplified navigation patterns
- Optimized imagery for smaller screens
- Faster loading times and performance

### 7.3 Component Adaptations
- Components maintain proportions and rules across devices
- Mobile-specific variations documented
- Touch-friendly spacing and sizing

---

## 8. Brand Application Guidelines

### 8.1 Writing Style

#### Principles
- Customer-focused messaging
- Transparent and honest communication
- Simple, clear language
- Consistent tone across all channels

### 8.2 Visual Consistency
- Logo placement and sizing
- Color palette adherence (90/10 rule)
- Typography hierarchy respect
- Component usage compliance
- Imagery style consistency

### 8.3 Platform-Specific Guidelines
- Web applications: Full component system
- Mobile apps: Native OS conventions + brand elements
- Email marketing: Simplified palette and typography
- Print materials: Color management and production rules

---

## 9. Design and Development Resources

### 9.1 Available Assets
- Logo package files (multiple formats)
- Color swatch files (ASE, LESS, SCSS)
- Icon gallery with variations
- Image gallery and libraries
- Typography specimens
- Component code libraries

#### Alternative Open-Source Fonts
If you prefer different typefaces while maintaining similar characteristics:

**Serif Alternatives to Merriweather:**
- Lora (elegant, similar x-height)
- Crimson Text (classic, traditional)
- EB Garamond (sophisticated, scholarly)

**Sans-serif Alternatives to Source Sans Pro:**
- Open Sans (widely supported, neutral)
- Inter (modern, optimized for screen)
- Roboto (versatile, excellent legibility)

### 10.3 File Formats & Deliverables
- Design files (Figma, Sketch, Adobe XD)
- Code components (HTML/CSS, React, Vue)
- Documentation and specifications

---

## 11. Best Practices Checklist

### Design Phase
- [ ] Follow the 6 core design principles
- [ ] Maintain customer-centric approach
- [ ] Use 90/10 color ratio rule
- [ ] Ensure color contrast WCAG AA compliance
- [ ] Apply typography hierarchy correctly
- [ ] Use components from the library
- [ ] Design for mobile-first approach

### Development Phase
- [ ] Implement consistent styling
- [ ] Ensure responsive breakpoints work
- [ ] Test color contrast with tools
- [ ] Verify font loading and fallbacks
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance optimization

### Quality Assurance
- [ ] Visual consistency check
- [ ] User testing with target audience
- [ ] Performance testing
- [ ] Cross-platform compatibility
- [ ] Brand guideline adherence

---

## 12. Frequently Asked Questions

### When to use secondary colors?
Use secondary colors to create special contrast for information or in illustrations. Do not mix warm and cold secondary colors. Maintain the 90/10 rule (90% primary, 10% secondary).

### What's the recommended font size for body text?
- **Desktop:** 20px (Body Text 1) or 16px (Body Text 2)
- **Mobile:** 16px for optimal readability

### How should accordions be used?
Accordions are useful for secondary content like FAQs. Avoid hiding important information in collapsed sections. Display collapsed by default and avoid excessive content.

### What's the preferred image strategy?
Use mood images for context and atmosphere. Support emotional storytelling while maintaining visual consistency. Include meaningful imagery on product and content pages.

---

## 13. Contact & Support

For questions about design implementation, guidelines interpretation, or asset requests:
- Refer to the official documentation hub
- Access component library and resources
- Download necessary design files and assets
- Review implementation examples

---

**Last Updated:** February 17, 2026  
**Version:** 1.0  
**Status:** Active & Current
