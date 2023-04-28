# caps-cloud

# Lab: AWS: Events

## Overview

- Using only AWS Services: SQS, SNS, and client applications, create a cloud version of the CAPS system.

## Feature Tasks & Requirements

- Refer to the CAPS System Overview for a complete review of the application, including Business and Technical requirements along with the development roadmap.

### Required Services

  - SNS Topic (FIFO): pickup which will receive all pickup requests from vendors.
  - SQS Queue (FIFO): packages which will contain all delivery requests from vendors, in order of receipt.
      - Subscribe this queue to the pickup topic so all pickups are ordered.
  - SQS Queue (Standard) for each vendor (named for the vendor) which will contain all delivery notifications from the drivers.

## UML

![Caps Cloud](https://user-images.githubusercontent.com/120413183/235062953-1f3eee8e-f101-46b2-bb86-68d9a6b6061c.png)
