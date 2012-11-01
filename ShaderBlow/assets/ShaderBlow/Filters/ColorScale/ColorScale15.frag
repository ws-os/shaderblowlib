#import "Common/ShaderLib/MultiSample.glsllib"

uniform COLORTEXTURE m_Texture;
uniform vec4 m_FilterColor;
uniform float m_ColorDensity;

in vec2 texCoord;
out vec4 fragColor;

void main() {
    vec3 color = getColor(m_Texture, texCoord).rgb;
    vec4 originalColor = vec4(color, 1.0);
    float colorFactor = clamp(m_ColorDensity, 0.0, 1.0);
    
    vec4 color2 = vec4(1.0);
   

#if defined(OVERLAY)
if (color.r < 0.5) {
    color2.r = 2.0 * color.r * m_FilterColor.r;
} else {
    color2.r = 1.0 - 2.0 * (1.0 - m_FilterColor.r) * (1.0 - color.r);
}

if (color.r < 0.5) {
    color2.g = 2.0 * color.g * m_FilterColor.g;
} else {
    color2.g = 1.0 - 2.0 * (1.0 - m_FilterColor.g) * (1.0 - color.g);
}

if (color.r < 0.5) {
    color2.b = 2.0 * color.b * m_FilterColor.b;
} else {
    color2.b = 1.0 - 2.0 * (1.0 - m_FilterColor.b) * (1.0 - color.b);
}
#elif defined(MULTYPLY)
color2.rgb = color.rgb * m_FilterColor.rgb;
#else
color2.rgb = m_FilterColor.rgb;
#endif

    fragColor.rgb = mix(originalColor.rgb, color2.rgb, colorFactor);
    fragColor.a = 1.0;
}