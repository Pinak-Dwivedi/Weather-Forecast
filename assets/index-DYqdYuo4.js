(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const M=document.querySelector("[data-theme-switch-button]"),v=M.querySelector("[data-theme-switch-cursor]");M.addEventListener("click",()=>{document.body.classList.contains("dark")?(v.style.setProperty("--translateX","0"),document.body.classList.remove("dark"),document.body.classList.add("light")):(v.style.setProperty("--translateX","100"),document.body.classList.add("dark"),document.body.classList.remove("light"))});const i=(e,n=document)=>n.querySelector(`[data-${e}]`);function G(e){e.append(J())}function N(e){const n=document.createElement("span");n.innerHTML=" mm",e.append(n)}function O(e){const n=document.createElement("span");n.innerHTML=" km/h",e.append(n)}function x(e){const n=document.createElement("span");n.innerHTML="%",e.append(n)}function J(){const e=document.createElement("span");return e.innerHTML="&deg;C",e}function V(e){const n=new Date(e);return{date:Q(n),time:ee(n)}}function a(e,n,o=!1){e.textContent=n.toString(),o&&G(e)}function Q(e){return new Intl.DateTimeFormat("en-US",{month:"long",weekday:"long",day:"2-digit",year:"2-digit"}).format(e)}function Y(e){const n=new Date(e);return new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(n)}function ee(e){return new Intl.DateTimeFormat("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}).format(e)}function te(e){return new Date(e).getHours()===new Date().getHours()}function ne(e){const n=new Date(e);return new Intl.DateTimeFormat("en-US",{day:"2-digit",month:"long"}).format(n)}function W(){document.body.classList.remove("blurred")}function q(e){return e<=2?"Low":e<=5?"Moderate":e<=7?"High":e<=10?"Very High":"Extreme"}const z=new URL("https://api.open-meteo.com/v1/forecast?latitude&longitude&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,precipitation_sum&timezone"),P=z.searchParams;async function re(e,n,o){try{P.set("latitude",e.toString()),P.set("longitude",n.toString()),P.set("timezone",o.toString());const c=await fetch(z);if(c.ok)return await c.json();throw await c.json()}catch(c){throw c}}function ie(){return new Promise((e,n)=>{navigator.geolocation.getCurrentPosition(o=>{const{latitude:c,longitude:t}=o.coords,r=Intl.DateTimeFormat().resolvedOptions().timeZone;W(),re(c,t,r).then(m=>{e(m)}).catch(m=>{n(m)})},o=>{W(),console.error(o.message),alert("Sorry couldn't access your location!")},{enableHighAccuracy:!0})})}const A=new Map;d([0,1],"sun");d([2],"partly-cloudy");d([3],"cloud");d([45,48],"overcast");d([51,61,80],"rainy-light");d([53,63,81],"rainy-moderate");d([55,65,82],"rainy-heavy");d([56,57,66,67],"rainy-snow");d([71,85],"snow-light");d([73],"snow-moderate");d([75,77,86],"snow-heavy");d([95],"thunderstorm");d([96,99],"hail");function d(e,n){e.forEach(o=>{A.set(o,n)})}function B(e){const n=A.get(e);return n?`/icons/${n}.svg`:"/icons/cloud.svg"}ie().then(e=>{oe(e),ae(e),ce(e),ue()}).catch(e=>{console.error(e),console.error(e.reason),alert("Counldn't fetch weather")});function oe(e){const{time:n,temp:o,weatherCode:c,humidity:t,isDay:r,windSpeed:m,precipitation:u,tempHigh:l,tempLow:p,feelsLikeHigh:h,feelsLikeLow:y,uvIndex:g}=se(e),C=i("current-temp"),H=i("current-icon"),S=i("current-date"),T=i("current-time"),E=i("current-temp-high"),s=i("current-temp-low"),f=i("current-fl-high"),k=i("current-fl-low"),D=i("current-precipitation"),b=i("current-uv-index"),_=i("current-humidity"),F=i("current-day-night"),w=i("current-wind-speed");a(C,o,!0),H.src=B(c);const L=V(n);a(S,L.date),a(T,L.time),a(E,l,!0),a(s,p,!0),a(f,h,!0),a(k,y,!0),a(D,u),N(D),a(b,q(g)),a(_,t),x(_),a(F,r?"Day":"Night"),a(w,m),O(w)}function ae(e){const n=me(e),o=i("hourly-segment-cards-container"),c=i("hourly-temp-card-template"),t=document.createDocumentFragment();for(let r=0;r<24;r++)j(c,t,n,"hourly",r);o.innerHTML="",o.append(t)}function ce(e){const n=de(e),o=i("daily-segment-cards-container"),c=i("daily-temp-card-template"),t=document.createDocumentFragment();for(let r=0;r<7;r++)j(c,t,n,"daily",r);o.innerHTML="",o.append(t)}function se(e){const{current:{time:n,temperature_2m:o,weather_code:c,relative_humidity_2m:t,is_day:r,wind_speed_10m:m,precipitation:u},daily:{temperature_2m_max:[l],temperature_2m_min:[p],apparent_temperature_max:[h],apparent_temperature_min:[y],uv_index_max:[g]}}=e;return{time:n,temp:o,weatherCode:c,humidity:t,isDay:r,windSpeed:m,precipitation:u,tempHigh:l,tempLow:p,feelsLikeHigh:h,feelsLikeLow:y,uvIndex:g}}function me(e){const{hourly:{time:n,temperature_2m:o,relative_humidity_2m:c,apparent_temperature:t,precipitation_probability:r,weather_code:m,wind_speed_10m:u,uv_index:l,is_day:p}}=e;return{time:n,temp:o,humidity:c,feelsLike:t,precipitation:r,weatherCode:m,windSpeed:u,uvIndex:l,isDay:p}}function de(e){const{daily:{time:n,weather_code:o,temperature_2m_max:c,temperature_2m_min:t,apparent_temperature_max:r,apparent_temperature_min:m,uv_index_max:u,precipitation_sum:l}}=e;return{time:n,weatherCode:o,tempHigh:c,tempLow:t,feelsLikeHigh:r,feelsLikeLow:m,uvIndex:u,precipitation:l}}function j(e,n,o,c,t){const{time:r,temp:m,weatherCode:u,feelsLike:l,tempHigh:p,tempLow:h,feelsLikeHigh:y,feelsLikeLow:g,humidity:C,uvIndex:H,precipitation:S,windSpeed:T,isDay:E}=o,s=e.content.cloneNode(!0),f=i("segment-card-title",s),k=i("segment-card-temp",s),D=i("segment-card-date",s),b=i("segment-card-icon",s),_=i("segment-card-humidity",s),F=i("segment-card-feels-like",s),w=i("segment-card-precipitation",s),L=i("segment-card-wind-speed",s),I=i("segment-card-uv-index",s),X=i("segment-card-day-night",s),$=i("segment-card-temp-high",s),K=i("segment-card-temp-low",s),R=i("segment-card-feel-like-high",s),Z=i("segment-card-feel-like-low",s);c==="hourly"?(te(r[t])&&U(s),a(f,V(r[t]).time),a(k,m[t],!0),a(_,C[t]),x(_),a(F,l[t],!0),a(L,T[t]),O(L),a(X,E[t]?"Day":"Night")):(t===0?(a(f,"Today"),U(s)):a(f,Y(r[t])),a(D,ne(r[t])),a($,p[t],!0),a(K,h[t],!0),a(R,y[t],!0),a(Z,g[t],!0)),b.src=B(u[t]),a(w,S[t]),N(w),a(I,q(H[t])),n.append(s)}function U(e){i("segment-card",e).classList.add("present")}function ue(){i("hourly-segment-cards-container").querySelector(".present").scrollIntoView({inline:"start",behavior:"smooth"})}
