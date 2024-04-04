# 🔗 Services

여기는 VODA Team의 services directory 입니다.

---

### 🗒️ Description

각종 API 요청들을 모아둔 디렉토리

### 🔎 How to use

```javascript
import { getDataApi } from '@/services/example';
...

const data = await getDataApi()
  .then((res) => res.data)
  .catch((error) => console.error(error));
```

### 💡 Example

```tsx
export const getDataApi = () => fetch('/example/request/api', {
  method: 'GET',
  headers: { ... }
})
```
