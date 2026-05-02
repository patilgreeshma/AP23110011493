# Notification System Design

## Problem Statement

The campus notifications application has been running for some time and sends many notifications related to placements, results, and events. Because of the high volume of notifications, users may miss important updates.

The objective of this task is to build a **Priority Inbox** that always displays the top **10 most important unread notifications**.

The priority should be based on:

Placement > Result > Event

If multiple notifications have the same priority, then the most recent notification should appear first.

---

## Technology Used

I used **JavaScript (Node.js)** for implementing this solution.

---

## Input Data

The notifications are fetched from the provided API.

GET /evaluation-service/notifications

Each notification contains the following fields:

- ID  
- Type  
- Message  
- Timestamp  

Example:

```json

{
"ID": "f2ceace7-9bea-48f6-8469-e561ae9368e8",
"Type": "Result",
"Message": "project-review",
"Timestamp": "2026-05-01 13:33:45"
}

```
---

## My Approach

### Step 1: Fetch Notifications

I used the given API and Bearer token to fetch all notifications.

### Step 2: Assign Priority Weights

To compare importance, I assigned weights:

| Notification Type | Weight |
|-------------------|--------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

This makes Placement notifications highest priority.

### Step 3: Sort Notifications

The notifications are sorted using two rules:

#### Rule 1: Higher Priority First

Placement notifications appear before Result, and Result before Event.

#### Rule 2: Latest First

If two notifications have the same type, then the latest timestamp is shown first.

Example order:

1. Placement (new)  
2. Placement (old)  
3. Result (new)  
4. Result (old)  
5. Event  

### Step 4: Select Top 10

After sorting, the first 10 notifications are selected:

```javascript
top10 = sortedNotifications.slice(0, 10);
```

These notifications are displayed in terminal output.

---

## Time Complexity

Let n be the total number of notifications.

### Sorting

O(n log n)

### Taking Top 10

O(10)

### Total Complexity

O(n log n)

This is efficient for normal datasets.

---

## Space Complexity

O(n)

Because notifications are stored in memory for sorting.



## Why I Chose This Approach

- Easy to understand  
- Easy to implement  
- Gives correct priority ordering  
- Uses timestamps correctly  
- Works well for Stage 1 requirement  
- Can be optimized later  

---

## Sample Output

Top 10 Notifications

1. Placement | Amazon hiring | 2026-05-01 19:05:15  
2. Placement | PayPal hiring | 2026-05-01 18:22:10  
3. Placement | Broadcom hiring | 2026-05-01 17:55:32  
4. Result | mid-sem | 2026-05-01 16:47:15  
5. Result | project-review | 2026-05-01 15:10:44  
6. Result | end-sem | 2026-05-01 14:35:21  
7. Event | farewell | 2026-05-01 13:22:01  
8. Event | cult-fest | 2026-05-01 12:05:30  
9. Event | induction | 2026-05-01 11:14:09  
10. Event | tech-fest | 2026-05-01 10:02:41  

---

## Conclusion

This solution successfully builds a Priority Inbox that shows the top 10 most important notifications based on priority and recency.

It improves user experience by ensuring that important placement and result notifications are not missed among less important updates.