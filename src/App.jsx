import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import elements from "../data/elements.json";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Chip,
  Paper,
  Divider
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const categoryColors = {
  "Nonmetal": "#a1ff9a",
  "Alkali Metal": "#009990",
  "Alkaline Earth Metal": "#ffb347",
  "Transition Metal": "#ffb3d5",
  "Metalloid": "#FC819E",
  "Halogen": "#9ad5ff",
  "Noble Gas": "#ADBC9F",
  "Post-transition Metal": "#d5b3ff",
  "Lanthanide": "#e6b800",
  "Actinide": "#ff9999"
};

export default function PeriodicTable() {
  const [filters, setFilters] = useState(["All"]);
  const [hoveredElement, setHoveredElement] = useState(null);

  const uniqueCategories = [...new Set(elements.map(e => e.category))];

  const isElementActive = (element) => {
    return filters.includes("All") || filters.includes(element.category);
  };

  const toggleFilter = (category) => {
    if (category === "All") {
      setFilters(["All"]);
    } else {
      if (filters.includes(category)) {
        setFilters(filters.filter(f => f !== category));
        if (filters.length === 1) {
          setFilters(["All"]);
        }
      } else {
        setFilters([...filters.filter(f => f !== "All"), category]);
      }
    }
  };

  const renderMainTable = () => {
    const table = Array(7).fill().map(() => Array(18).fill(null));

    elements
      .filter(el => el.y <= 7)
      .forEach(element => {
        table[element.y - 1][element.x - 1] = element;
      });

    return table.map((row, rowIndex) => (
      <Box key={`row-${rowIndex}`} sx={{
        display: 'flex',
        gap: '4px',
        mb: '2px',
        justifyContent: 'center'
      }}>
        {row.map((element, colIndex) => (
          <Box
            key={`cell-${rowIndex}-${colIndex}`}
            sx={{
              width: '48px',
              height: '48px',
              opacity: element ? (isElementActive(element) ? 1 : 0.3) : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {element && (
              <motion.div
                whileHover={{ scale: isElementActive(element) ? 1.2 : 1 }}
                onHoverStart={() => setHoveredElement(element)}
                onHoverEnd={() => setHoveredElement(null)}
              >
                <Paper
                  elevation={isElementActive(element) ? 3 : 1}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 0.8 opacity
                    color: categoryColors[element.category],
                    border: `1px solid ${categoryColors[element.category]}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                    {element.symbol}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
                    {element.atomicNumber}
                  </Typography>
                </Paper>
              </motion.div>
            )}
          </Box>
        ))}
      </Box>
    ));
  };

  const renderSeries = (seriesElements, label) => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
        {label}
      </Typography>
      <Box sx={{
        display: 'flex',
        gap: '4px',
        justifyContent: 'center',
        mb: '4px'
      }}>
        {seriesElements.map(element => (
          <Box
            key={element.symbol}
            sx={{
              width: '48px',
              height: '48px',
              opacity: isElementActive(element) ? 1 : 0.3,
              transition: 'opacity 0.3s ease',
            }}
          >
            <motion.div
              whileHover={{ scale: isElementActive(element) ? 1.4 : 1 }}
              onHoverStart={() => setHoveredElement(element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
              <Paper
                elevation={isElementActive(element) ? 3 : 1}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 0.8 opacity
                  color: categoryColors[element.category],
                  border: `1px solid ${categoryColors[element.category]}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                  {element.symbol}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
                  {element.atomicNumber}
                </Typography>
              </Paper>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        overflowX: 'hidden'
      }}>
        {/* Header and other components remain the same */}
        <AppBar position="static" elevation={0} sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #3f51b5 30%, #2196F3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              AtomVerse
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Filter Chips */}
        <Box sx={{
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <Chip
            label="All"
            onClick={() => toggleFilter("All")}
            color={filters.includes("All") ? "primary" : "default"}
            variant={filters.includes("All") ? "filled" : "outlined"}
            sx={{
              fontWeight: 'bold',
              borderRadius: '8px',
              color: filters.includes("All") ? 'white' : categoryColors["Nonmetal"]
            }}
          />
          {uniqueCategories.map(category => (
            <Chip
              key={category}
              label={category}
              onClick={() => toggleFilter(category)}
              sx={{
                backgroundColor: filters.includes(category) ? categoryColors[category] : 'transparent',
                borderColor: categoryColors[category],
                color: filters.includes(category) ? 'black' : categoryColors[category],
                fontWeight: 'bold',
                borderRadius: '8px'
              }}
              variant={filters.includes(category) ? "filled" : "outlined"}
            />
          ))}
        </Box>

        {/* Periodic Table */}
        <Box sx={{
          p: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {renderMainTable()}
          {renderSeries(
            elements.filter(el => el.y === 9).sort((a, b) => a.x - b.x),
            "Lanthanides"
          )}
          {renderSeries(
            elements.filter(el => el.y === 10).sort((a, b) => a.x - b.x),
            "Actinides"
          )}
        </Box>

        {/* Hover Info Card */}
        <AnimatePresence>
          {hoveredElement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                width: '300px'
              }}
            >
              <Card elevation={10} sx={{ borderRadius: '8px' }}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1
                  }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {hoveredElement.name} ({hoveredElement.symbol})
                    </Typography>
                    <Chip
                      label={hoveredElement.category}
                      sx={{
                        backgroundColor: categoryColors[hoveredElement.category],
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        height: '24px',
                        borderRadius: '8px'
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Atomic Number
                      </Typography>
                      <Typography variant="body1">
                        {hoveredElement.atomicNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Atomic Mass
                      </Typography>
                      <Typography variant="body1">
                        {hoveredElement.atomicMass}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Phase
                      </Typography>
                      <Typography variant="body1">
                        {hoveredElement.phase}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Position
                      </Typography>
                      <Typography variant="body1">
                        {hoveredElement.x}, {hoveredElement.y}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    {hoveredElement.summary}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
}
