---
# System Design Document

## 1. System Architecture and Data Model

### Architecture

The system is built using a **layered architecture**:


- **API Layer**: Exposes REST endpoints to manage transactions, parties, properties, and payments. Handles validation.
- **Business Logic Layer**: Implements transaction lifecycle and commission calculation directly in controllers.
- **ORM Layer**: Uses Sequelize ORM for database operations (not raw SQL).
- **Database**: Relational database (PostgreSQL) for structured and reliable storage.

> This separation ensures maintainability, testability, and extensibility. If commission rules change or new workflows are added, only the service layer is updated while API and DB remain stable.

### Data Model


We identified **five core entities**:

| Entity             | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Property**       | Represents the real estate being sold or rented.                            |
| **Party**          | Generalized entity for all stakeholders (agency, agents, buyers, sellers, tenants). |
| **Transaction**    | Represents a deal (sale or rental), tracks lifecycle stages (agreement → earnest money → title deed → completed). |
| **TransactionParty** | Joins transactions with parties and specifies their role (listing agent, selling agent, buyer, seller, tenant). |
| **Payment**        | Records financial flows (earnest deposits, commission payouts).             |

#### Data Model Diagram

![Data Model Diagram](Images/Screenshot_1.png)


#### Why This Model?

- **Normalized structure**: Avoids duplication by keeping Party generalized.
- **Extensible**: Commission rules can be applied using `TransactionParty.role` and `share_percentage` without schema changes.
- **Traceable**: Every financial/payment action is linked to a transaction and party.

#### Alternative Approaches Considered and Rejected

- **Separate Agent and Client tables**: Rejected in favor of a single Party table to reduce duplication and simplify joins.
- **Storing commissions directly inside Transaction**: Rejected because commissions depend on roles and share percentages; storing them in Payments provides better flexibility and auditability.


---

## 2. Riskiest or Most Challenging Aspect

The riskiest aspect of the design is **commission calculation and distribution**.

**Why risky?**

Commission rules often change, can vary by scenario, and may involve exceptions (special contracts, referral bonuses, promotional campaigns). Hardcoding these rules would make the system inflexible and error-prone.


**Solutions :**

- Commission logic is implemented in the transaction controller, based on `TransactionParty.role` and `share_percentage`.
- Each agent's `share_percentage` is a percentage of the total commission. The agency receives the remainder.
- If no `share_percentage` is set, default splits are applied (e.g., 50/50 between agency and agent, or equal split between two agents and agency).
- Commission is calculated and payments are created when the transaction status is updated to **"title deed"** or **"completed"**.

> This makes the system robust to current requirements and adaptable to future complexities.

---

