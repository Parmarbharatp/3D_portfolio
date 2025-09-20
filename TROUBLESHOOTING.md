# Troubleshooting Guide

This guide helps resolve common issues with the 3D Developer Portfolio.

## 🚨 Common Issues & Solutions

### 1. WebGL Context Loss / Blank Screen

**Symptoms:**
- Screen goes blank after a few seconds
- Console shows "THREE.WebGLRenderer: Context Lost"
- 3D elements disappear

**Solutions:**
- **Automatic Recovery**: The app now includes automatic WebGL context recovery
- **Performance Mode**: Low-end devices automatically switch to 2D fallbacks
- **Memory Management**: Improved resource cleanup prevents memory leaks

### 2. Image Loading Errors

**Symptoms:**
- Console shows "Could not load /src/assets/tech/html.png: undefined"
- Technology icons don't display

**Solutions:**
- **Fallback System**: Missing images now show colored spheres instead
- **Error Boundaries**: Individual components won't crash the entire app
- **Lazy Loading**: Images load progressively to prevent overwhelming the browser

### 3. Performance Issues

**Symptoms:**
- Slow scrolling or animations
- High CPU usage
- Browser becomes unresponsive

**Solutions:**
- **Device Detection**: Automatically optimizes based on device capabilities
- **Reduced Motion**: Respects user's motion preferences
- **Canvas Limits**: Limits simultaneous 3D canvases on mobile devices

### 4. Mobile Compatibility

**Symptoms:**
- App doesn't work on mobile devices
- Touch interactions don't work
- Layout breaks on small screens

**Solutions:**
- **Responsive Design**: All components adapt to screen size
- **Touch Support**: Optimized for touch interactions
- **Mobile Fallbacks**: 2D alternatives for 3D features on low-end devices

## 🔧 Debug Tools

### Performance Monitor
In development mode, a debug panel appears in the bottom-right corner showing:
- WebGL support status
- Device capabilities
- Connection information
- Memory and CPU cores

### Error Boundaries
Each 3D component is wrapped in error boundaries that:
- Catch and display errors gracefully
- Provide retry functionality
- Prevent app crashes

## 📱 Device Optimization

### High-End Devices
- Full 3D experience
- All animations enabled
- Maximum quality settings

### Mid-Range Devices
- Reduced animation complexity
- Limited simultaneous 3D elements
- Optimized texture loading

### Low-End Devices
- 2D fallbacks for 3D elements
- Minimal animations
- Reduced motion support

## 🛠️ Manual Fixes

### Force 2D Mode
If you're experiencing issues, you can force 2D mode by adding this to your browser console:
```javascript
localStorage.setItem('force2D', 'true');
```

### Reset Settings
To reset all optimizations:
```javascript
localStorage.clear();
```

### Check WebGL Support
Test WebGL support in your browser:
```javascript
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
console.log('WebGL supported:', !!gl);
```

## 🐛 Known Issues

### Chrome on Windows
- Sometimes shows WebGL context loss on integrated graphics
- **Fix**: Update graphics drivers or use dedicated GPU

### Safari on iOS
- Limited WebGL support on older devices
- **Fix**: Automatic fallback to 2D mode

### Firefox
- Occasional texture loading issues
- **Fix**: Refresh the page or clear browser cache

## 📞 Getting Help

If you're still experiencing issues:

1. **Check Console**: Open browser dev tools and look for error messages
2. **Performance Monitor**: Use the debug panel to check device capabilities
3. **Browser Compatibility**: Ensure you're using a modern browser
4. **Hardware**: Check if your device meets minimum requirements

### Minimum Requirements
- **RAM**: 2GB minimum, 4GB recommended
- **GPU**: Any modern GPU with WebGL support
- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **OS**: Windows 10, macOS 10.14+, Linux (any modern distro)

## 🔄 Recent Fixes

### Version 2.1.0
- ✅ Fixed WebGL context loss issues
- ✅ Added automatic error recovery
- ✅ Implemented device-specific optimizations
- ✅ Added fallback systems for missing assets
- ✅ Improved mobile performance
- ✅ Added error boundaries for all 3D components

### Version 2.0.0
- ✅ Added responsive design
- ✅ Implemented touch support
- ✅ Added performance monitoring
- ✅ Created mobile utilities
- ✅ Added WebGL utilities

---

**Note**: This troubleshooting guide is updated regularly. If you find a new issue, please report it with detailed information about your device, browser, and the specific error messages you're seeing.
