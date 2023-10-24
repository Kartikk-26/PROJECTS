#include <stdio.h>
#include <string.h>

#define MAX 20

// Structure of Employee
struct Employee {
    char name[50];
    long int code;
    char designation[50];
    int exp;
    int age;
};

int num;

// Array of Employees to store the data
struct Employee emp[MAX];

// Function to build the table
void build() {
    printf("Build The Table\n");
    printf("Maximum Entries can be %d\n", MAX);

    printf("Enter the number of Entries required: ");
    scanf("%d", &num);

    if (num > MAX) {
        printf("Maximum number of Entries are 20\n");
        num = MAX;
    }

    printf("Enter the following data:\n");

    for (int i = 0; i < num; i++) {
        printf("Name: ");
        scanf("%s", emp[i].name);

        printf("Employee ID: ");
        scanf("%ld", &emp[i].code);

        printf("Designation: ");
        scanf("%s", emp[i].designation);

        printf("Experience: ");
        scanf("%d", &emp[i].exp);

        printf("Age: ");
        scanf("%d", &emp[i].age);
    }

    showMenu();
}

// Function to insert data
void insert() {
    if (num < MAX) {
        int i = num;
        num++;

        printf("Enter the information of the Employee\n");
        printf("Name: ");
        scanf("%s", emp[i].name);

        printf("Employee ID: ");
        scanf("%ld", &emp[i].code);

        printf("Designation: ");
        scanf("%s", emp[i].designation);

        printf("Experience: ");
        scanf("%d", &emp[i].exp);

        printf("Age: ");
        scanf("%d", &emp[i].age);
    } else {
        printf("Employee Table Full\n");
    }

    showMenu();
}

// Function to delete record at index i
void deleteIndex(int i) {
    for (int j = i; j < num - 1; j++) {
        emp[j] = emp[j + 1];
    }
}

// Function to delete a record
void deleteRecord() {
    printf("Enter the Employee ID to Delete Record: ");

    long int code;
    scanf("%ld", &code);

    for (int i = 0; i < num; i++) {
        if (emp[i].code == code) {
            deleteIndex(i);
            num--;
            break;
        }
    }

    showMenu();
}

// Function to search a record
void searchRecord() {
    printf("Enter the Employee ID to Search Record: ");

    long int code;
    scanf("%ld", &code);

    for (int i = 0; i < num; i++) {
        if (emp[i].code == code) {
            printf("Name: %s\n", emp[i].name);
            printf("Employee ID: %ld\n", emp[i].code);
            printf("Designation: %s\n", emp[i].designation);
            printf("Experience: %d\n", emp[i].exp);
            printf("Age: %d\n", emp[i].age);
            break;
        }
    }

    showMenu();
}

// Function to show the menu
void showMenu() {
    printf("-------------------------"
           "Employee Management System"
           "-------------------------\n\n");

    printf("Available Options:\n\n");
    printf("Build Table         (1)\n");
    printf("Insert New Entry    (2)\n");
    printf("Delete Entry        (3)\n");
    printf("Search a Record     (4)\n");
    printf("Exit                (5)\n");

    int option;
    printf("Enter your choice: ");
    scanf("%d", &option);

    switch (option) {
        case 1:
            build();
            break;
        case 2:
            insert();
            break;
        case 3:
            deleteRecord();
            break;
        case 4:
            searchRecord();
            break;
        case 5:
            return;
        default:
            printf("Expected Options are 1/2/3/4/5\n");
            showMenu();
    }
}

// Driver Code
int main() {
    showMenu();
    return 0;
}
