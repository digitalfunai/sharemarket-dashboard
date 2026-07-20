# Finora Share Market SaaS Dashboard --- Deliverables

## Design Brief

A premium fintech SaaS dashboard built with HTML5, Bootstrap 5, CSS3,
Vanilla JavaScript, and Chart.js. The UI uses glassmorphism, responsive
layouts, dark/light themes, and realistic Indian market data.

## Token JSON

``` json
{
  "project":"Finora Share Market SaaS Dashboard",
  "stack":["HTML5","Bootstrap 5","CSS3","Vanilla JavaScript","Chart.js"],
  "theme":["Dark","Light"],
  "design":"Glassmorphism",
  "status":"Completed"
}
```

## Deliverable JSON

``` json
{
  "pricingPagePreserved": true,
  "glassmorphismApplied": true,
  "marketTabsWorking": true,
  "mobileNavigation": "Fixed",
  "desktopSidebarCollapse": "Fixed",
  "interactiveCharts": true,
  "responsive": true
}
```

## Loop Transcript

1.  Built the initial dashboard.
2.  Created dedicated Portfolio, Markets, IPO, Watchlist, Orders,
    Holdings, and News pages.
3.  Redesigned Market Overview and Indian Indices.
4.  Applied glassmorphism across all pages.
5.  Fixed mobile navigation and desktop sidebar collapse.
6.  Enabled working market tabs and improved responsiveness.
7.  Performed final QA and UI polish.

------------------------------------------------------------------------

## Main Prompt

MASTER PROMPT — Premium Share Market SaaS Dashboard (HTML5 + Bootstrap 5 + JavaScript)

Role

Act as a Senior UI/UX Designer, Senior Frontend Engineer, and Senior SaaS Product Designer with 15+ years of experience in designing premium fintech platforms.

Design and develop a production-ready Share Market SaaS Dashboard using only:

HTML5

Bootstrap 5

CSS3

Vanilla JavaScript (ES6)

Do NOT use:

React

Vue

Angular

Tailwind CSS

jQuery

Any UI template

Any CSS framework except Bootstrap 5

The final dashboard should look like a premium SaaS product comparable to:

TradingView

Binance

Zerodha Kite

Bloomberg Terminal (Modern)

CoinMarketCap Pro

Groww Premium

The attached reference image

Do not copy the design exactly. Instead, take inspiration from its visual language while creating a unique, production-quality interface.

Design Language

Create a luxurious fintech experience.

Use

Glassmorphism

Frosted cards

Soft gradients

Large rounded corners

Elegant shadows

Thin borders

Premium spacing

Neon green accents

Smooth micro-interactions

Floating cards

Modern financial SaaS aesthetics

Avoid anything that looks like a default Bootstrap template.

Everything should feel polished and premium.

Theme System

Build a complete theme system using CSS Variables.

Include:

Dark Mode

Light Mode

Provide a toggle button in the navbar.

Store the selected theme using localStorage so it persists across page refreshes and across all pages.

Color Palette

Dark Theme

Background: #061311

Sidebar: #081A18

Cards: #0D2320

Hover Card: #12322C

Primary: #B8FF44

Primary Hover: #D4FF73

Accent: #44FFB2

Border: rgba(255,255,255,.08)

Heading: #FFFFFF

Body Text: #98A6A4

Danger: #FF5E6C

Success: #78FF68

Warning: #FFC857

Light Theme

Background: #F7FAF9

Cards: #FFFFFF

Primary: #8DEB29

Text: #101414

Border: #E4E7E9

Typography

Use

Inter

Fallback

sans-serif

Font weights

300

400

500

600

700

Large financial numbers should be bold and highly visible.

Responsive Design

Desktop

1920px

1600px

1440px

1366px

Tablet

1200px

992px

768px

Mobile

576px

375px

The entire dashboard should be fully responsive.

Folder Structure

sharemarket-dashboard/

│

├── index.html
├── pricing.html
├── portfolio.html
├── markets.html
├── watchlist.html
├── orders.html
├── holdings.html
├── ipo.html
├── news.html
├── settings.html

├── css/
│      bootstrap.min.css
│      variables.css
│      style.css
│      responsive.css

├── js/
│      app.js
│      theme.js
│      sidebar.js
│      charts.js
│      dashboard.js
│      pricing.js

├── assets/
│      images/
│      icons/
│      logo/

├── vendor/
│      bootstrap.bundle.min.js
│      chart.min.js

Sidebar

Create a premium fixed sidebar.

Include

Logo

Dashboard

Portfolio

Markets

Watchlist

Orders

Holdings

Mutual Funds

IPO

News

Economic Calendar

Analytics

Reports

Pricing

Settings

Help

Logout

Every item should use Bootstrap Icons.

Active item should have

Green glow

Gradient background

Smooth animation

Sidebar should support

Collapse

Expand

Mobile Offcanvas

Upgrade To Pro Card

Above the Logout button, create a premium promotional card.

Design:

Glassmorphism

Green gradient

Crown icon

Soft glowing border

Hover lift animation

Content

Upgrade to Pro

Unlock AI-powered investing, advanced analytics, real-time alerts, and premium trading tools.

Button

Upgrade Now

Clicking it should navigate to

pricing.html

Navbar

Include

Search Bar

Notifications

Messages

Theme Toggle

Language Selector

Profile

Dropdown Menu

Online Status

Dashboard Sections

Hero Statistics

Create four animated cards

Portfolio Value

Today's Profit

Total Investment

Available Cash

Each card should include

Animated counter

Mini sparkline

Percentage

Trend

Hover glow

Portfolio Performance

Large Trading Chart

Features

Line Chart

Area Chart

Weekly

Monthly

Yearly

Export

Download

Refresh

Fullscreen

Chart Tooltips

Use Chart.js.

Watchlist

Responsive table

Columns

Symbol

Company

Price

Day %

Volume

Market Cap

Action

Add

Sorting

Searching

Pagination

Live simulated price updates

Portfolio Allocation

Animated Doughnut Chart

Stocks

ETF

Mutual Funds

Gold

Cash

Crypto

Market Overview

Cards for

NIFTY

SENSEX

BANKNIFTY

NASDAQ

DOW

S&P500

Each card should display

Current Price

Day %

Mini Chart

Status

Top Movers

Sections

Top Gainers

Top Losers

Trending Stocks

52 Week High

52 Week Low

Economic Calendar

Display

Date

Time

Country Flag

Event

Forecast

Previous

Actual

Impact

Include filtering.

Latest Financial News

Card layout

Thumbnail

Category

Title

Summary

Read More

Bookmark

Share

IPO Dashboard

Sections

Open IPO

Upcoming IPO

Closed IPO

Display

GMP

Subscription

Listing Date

Status

Progress Bar

Sector Performance

Horizontal progress bars

Banking

IT

Pharma

FMCG

Auto

Metal

Realty

Energy

Heat Map

Stock market heatmap using colored tiles.

Recent Trades

Table

Buy

Sell

Quantity

Date

Status

Profit/Loss

Notifications

Cards

Dividend

Bonus

Market Alerts

Breaking News

Calendar Widget

Current month

Dividend dates

Holidays

Economic Events

Market Hours

Display

India

London

New York

Tokyo

Sydney

Show

Open

Closed

Remaining Time

AI Insights

Card displaying

Market Sentiment

Portfolio Risk

AI Recommendation

Confidence %

Pricing Page (pricing.html)

Maintain exactly the same design language as the dashboard.

Hero Section

Heading

Choose the perfect plan for your investing journey

Subtitle

Start free and upgrade anytime for AI-driven analytics, premium market tools, and professional investing insights.

Animated gradient background.

Billing Toggle

Create a toggle

Monthly

Yearly

Display

Save 20%

Switching the toggle should animate and update all pricing dynamically using JavaScript.

Pricing Plans

Starter

₹0

Features

Dashboard

Watchlist

Market Overview

Basic Charts

Community Support

Button

Get Started

Pro (Most Popular)

Display glowing badge

Most Popular

Price

₹999/month

₹9,599/year

Features

Unlimited Watchlists

Advanced Charts

AI Insights

Portfolio Analytics

Technical Indicators

Export Reports

Real-time Alerts

Economic Calendar

Email Support

Button

Upgrade to Pro

Premium

₹1,999/month

₹18,999/year

Features

Everything in Pro plus

AI Predictions

Live Scanner

Portfolio Optimizer

API Access

Advanced Risk Analysis

Unlimited Alerts

Multi-device Sync

Priority Support

Button

Start Premium

Enterprise

Contact Sales

Features

Unlimited Users

Team Workspace

Dedicated Manager

White Label

API Integration

Dedicated Server

SLA Support

Button

Contact Sales

Feature Comparison Table

Compare

Live Market Data

AI Insights

Technical Indicators

Portfolio Tracking

Watchlists

Alerts

Export Reports

API

Team Access

Email Support

Priority Support

Use Bootstrap Icons for checks and crosses.

Testimonials

Create premium testimonial cards

Include

Avatar

Name

Position

Rating

Review

Glassmorphism design.

FAQ

Bootstrap Accordion

Questions

Can I cancel anytime?

Free trial?

Payment methods?

Refund policy?

Taxes?

Upgrade later?

Is my data secure?

Trusted By

Responsive grayscale logo strip

Placeholder brands

Hover becomes colored.

CTA

Large promotional banner

Heading

Ready to unlock professional investing tools?

Buttons

Upgrade Now

Contact Sales

Footer

Include

About

Features

Pricing

API

Documentation

Privacy

Terms

Contact

Social Icons

Charts

Use Chart.js

Create

Line Chart

Area Chart

Doughnut

Bar Chart

Sparklines

Charts should include

Animation

Tooltips

Legends

Responsive resizing

JavaScript Features

Implement fully functional interactions using Vanilla JavaScript:

Theme Toggle (Dark/Light)

Theme persistence via localStorage

Sidebar collapse/expand

Mobile offcanvas sidebar

Search functionality

Notification dropdown

Profile dropdown

Animated counters

Chart initialization

Live simulated stock price updates

Table sorting

Table filtering

Pagination

Toast notifications

Tooltips

Popovers

Accordions

Modals

Export CSV

Download PDF (UI-ready)

Refresh dashboard

Skeleton loading

Page loader

Scroll to top button

Keyboard shortcuts

Billing toggle on Pricing page

Responsive navigation

Floating Action Button (FAB)

Smooth page transitions

Button ripple effects

Hover micro-interactions

Bootstrap Components

Use Bootstrap 5 components wherever appropriate:

Navbar

Grid System

Cards

Buttons

Dropdown

Modal

Toast

Tooltip

Popover

Accordion

Progress

Pagination

Collapse

Offcanvas

Spinner

Forms

Tables

Badges

Breadcrumb

Forms

Include modern forms for

Search

Filters

Date Range

Investment Calculator

Position Size Calculator

Risk Calculator

Stock Search

Use floating labels and client-side validation.

Animations

Implement premium animations:

Fade In

Slide Up

Card Lift

Glow Effects

Number Counter

Chart Drawing

Progress Bar Animation

Sidebar Animation

Theme Transition

Hover Lift

Button Ripple

Skeleton Loader

Smooth Scroll

Page Transition

All animations should feel subtle, smooth, and professional.

Accessibility & Performance

Semantic HTML5

SEO-friendly structure

ARIA labels

Keyboard navigation

Optimized CSS

Lazy loading where appropriate

Modular JavaScript

Reusable components

Clean code architecture

No inline CSS

No inline JavaScript

Cross-browser compatibility

Final Deliverable

Build a fully functional, production-ready, premium Share Market SaaS Dashboard with a dedicated Pricing page, complete Dark/Light Mode, responsive layouts, polished UI/UX, smooth animations, reusable components, and modern JavaScript interactions. The interface should feel comparable to a high-end commercial fintech SaaS product, with exceptional attention to detail in spacing, typography, visual hierarchy, and user experience, inspired by the provided reference while maintaining a unique design.

# Attached Enhancement Prompt

## Share Market SaaS Dashboard Enhancement Prompt

The overall design, theme, typography, sidebar, header, light/dark mode,
and Pricing page are excellent. **Do not modify the Pricing page or its
design.**

The remaining pages should behave like a professional stock market
trading platform with unique layouts, widgets, charts, tables, filters,
search, responsive behavior, and smooth Bootstrap animations.

### Dashboard

-   Portfolio summary
-   Today's gain/loss
-   Market overview
-   Top movers
-   Watchlist
-   Trending sectors
-   News widget
-   Upcoming IPOs
-   Portfolio allocation chart
-   Market heatmap

### Portfolio

-   Holdings table
-   Portfolio summary
-   Allocation charts
-   Interactive performance filters (1D--All)
-   Transactions

### Markets

-   Indian indices
-   Top gainers
-   Top losers
-   Most active
-   Sector performance
-   Market breadth
-   Global markets

### IPO

-   Open IPOs
-   Upcoming IPOs
-   Closed IPOs
-   IPO performance chart

### Watchlist

-   Add/remove stocks
-   Sorting
-   Filtering
-   Alerts
-   Mini charts

### Orders

-   Open
-   Executed
-   Pending
-   Cancelled

### News

-   Market
-   IPO
-   Economy
-   Global
-   Earnings

### Functional Requirements

-   Live search with autocomplete
-   Add Investment modal
-   Dynamic portfolio updates
-   Responsive navigation
-   Functional sidebar
-   Realistic Indian stock market demo data

### Technical Stack

-   HTML5
-   Bootstrap 5
-   Vanilla JavaScript
-   Chart.js
-   Responsive
-   Modular architecture
-   Dark/Light mode

**Important:** Preserve the existing design language and leave the
Pricing page unchanged.
