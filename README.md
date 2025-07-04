# Dashboard Project

A modern, interactive dashboard application built with Next.js and React, featuring comprehensive analytics, KPI tracking, and reporting capabilities.

## 🚀 Features

### Dashboard

- **KPI Cards**: Display key performance indicators with real-time data
- **Interactive Charts**: Multiple chart types including Bar, Line, Mixed, and Pie charts
- **Period Selection**: Switch between monthly, quarterly, and yearly data views
- **Responsive Design**: Optimized for desktop and mobile devices

### Reporting

- **Advanced Filtering**: Filter reports by various criteria
- **Data Visualization**: Visual representation of report data
- **Export Capabilities**: Export reports in different formats
- **Real-time Updates**: Dynamic data loading and updates

### UI/UX

- **Modern Interface**: Clean, intuitive design with smooth animations
- **Sidebar Navigation**: Easy navigation between different sections
- **Responsive Layout**: Works seamlessly across all device sizes
- **Dark/Light Theme**: Support for multiple themes

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Charts**: Recharts (or Chart.js)
- **Data Handling**: Custom data loaders and utilities
- **Development**: ESLint, Prettier, PostCSS

## 📁 Project Structure

```
dashboard-project/
├── public/
│   └── FE_Data_Kudwa/           # Data files
│       ├── Main Dashboard/       # Dashboard data
│       │   ├── monthly.json
│       │   ├── quarterly.json
│       │   └── yearly.json
│       └── Report/              # Report data
│           └── report.json
├── src/
│   └── app/
│       ├── components/          # Reusable components
│       │   ├── charts/          # Chart components
│       │   │   ├── BarChart.tsx
│       │   │   ├── LineChart.tsx
│       │   │   ├── MixedChart.tsx
│       │   │   └── PieChart.tsx
│       │   ├── report/          # Report components
│       │   │   ├── ReportControls.tsx
│       │   │   ├── ReportItem.tsx
│       │   │   └── ReportPeriodSelector.tsx
│       │   ├── KPICard.tsx
│       │   ├── PeriodSelector.tsx
│       │   └── Sidebar.tsx
│       ├── dashboard/           # Dashboard pages
│       │   └── page.tsx
│       ├── report/              # Report pages
│       │   └── page.tsx
│       ├── utils/               # Utility functions
│       │   ├── dataLoader.ts
│       │   └── reportDataLoader.ts
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd dashboard-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Data Structure

The application uses JSON files to store dashboard and report data:

### Dashboard Data

- **Monthly Data**: `public/FE_Data_Kudwa/Main Dashboard/monthly.json`
- **Quarterly Data**: `public/FE_Data_Kudwa/Main Dashboard/quarterly.json`
- **Yearly Data**: `public/FE_Data_Kudwa/Main Dashboard/yearly.json`

### Report Data

- **Report Data**: `public/FE_Data_Kudwa/Report/report.json`

## 🎯 Usage

### Dashboard Navigation

1. Use the sidebar to navigate between Dashboard and Report sections
2. Select different time periods (Monthly, Quarterly, Yearly) using the period selector
3. Interact with charts to view detailed data
4. Monitor KPIs through the dashboard cards

### Report Features

1. Apply filters using the report controls
2. View data in various chart formats
3. Export reports for external use
4. Switch between different report periods

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Adding New Features

1. **New Charts**: Add chart components in `src/app/components/charts/`
2. **New Pages**: Create pages in the appropriate directory under `src/app/`
3. **New Utilities**: Add utility functions in `src/app/utils/`
4. **New Data**: Add JSON files in `public/FE_Data_Kudwa/`

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:

- **Desktop**: Full-featured dashboard with all components
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Simplified interface with collapsible sidebar

## 🎨 Customization

### Themes

- Modify theme colors in `src/app/globals.css`
- Add new themes by extending the CSS variables

### Components

- All components are modular and can be easily customized
- Use Tailwind CSS classes for styling modifications

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy automatically with each push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `out` folder to your hosting provider

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📞 Support

For support, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using Next.js**
