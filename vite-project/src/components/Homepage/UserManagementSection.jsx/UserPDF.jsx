/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { Strings } from '../../../constants/Strings'
import { IconPack } from '../../../constants/IconPack'
import { UserManagementData } from '../../../utils/userManagementData'
import React from 'react'
import { PDFstyles } from './PDFStyles'

const styles = StyleSheet.create(PDFstyles)

const UserPDF = ({ userData, chartImage }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{Strings?.userDetails}</Text>

          {/* User Info Section - Full Width */}
          <View style={styles.userInfoContainer}>
            <View style={styles.userImageContainer}>
              <Image src={IconPack.userphoto} style={styles.userImage} />
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.subtitle}>User Information</Text>
              <Text style={styles.content}>Name: {userData?.userInfo?.name || 'N/A'}</Text>
              <Text style={styles.content}>Email: {userData?.userInfo?.email || 'N/A'}</Text>
              <Text style={styles.content}>ID: {userData?.userInfo?.username || 'N/A'}</Text>
              <Text style={styles.content}>Status: {userData?.userInfo?.status || 'N/A'}</Text>
            </View>
          </View>

          {/* Chart Image - Full Width */}
          <View style={styles.chartContainer}>
            <Text style={styles.subtitle}>Course Progress</Text>
            <Image src={chartImage} style={styles.chartImage} />
          </View>

          {/* Performance Section with Vertical Alignment, Border and Shadow */}
          <View style={styles.performanceSection}>
            <Text style={styles.subtitle}>Performance</Text>

            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Average Score:</Text>
              <Text style={styles.performanceValue}>{userData?.performance?.averageScore || 'N/A'}</Text>
            </View>

            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Highest Score:</Text>
              <Text style={styles.performanceValue}>{userData?.performance?.highestScore || 'N/A'}</Text>
            </View>

            <View style={styles.performanceItem}>
              <Text style={styles.performanceLabel}>Completion Rate:</Text>
              <Text style={styles.performanceValue}>{userData?.performance?.completionRate || 'N/A'}</Text>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* Table with Reduced Size */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Course</Text>
            <Text style={styles.tableCellHeader}>Score</Text>
            <Text style={styles.tableCellHeader}>Time</Text>
            <Text style={styles.tableCellHeader}>Attempts</Text>
            <Text style={styles.tableCellHeader}>Assigned</Text>
            <Text style={styles.tableCellHeader}>Completed</Text>
            <Text style={styles.tableCellHeader}>Status</Text>
          </View>

          {/* Table Rows with Sub-rows */}
          {UserManagementData.map((data, index) => (
            <React.Fragment key={index}>
              {/* Parent Row */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{data.course}</Text>
                <Text style={styles.tableCell}>{data.scoreAchieved}</Text>
                <Text style={styles.tableCell}>{data.timeTaken}</Text>
                <Text style={styles.tableCell}>{data.noOfAttempts}</Text>
                <Text style={styles.tableCell}>{data.assignedDate}</Text>
                <Text style={styles.tableCell}>{data.completedDate}</Text>
                <Text style={styles.tableCell}>{data.taskStatus}</Text>
              </View>

              {/* Sub-rows */}
              {data.subCourses?.map((subCourse, subIndex) => (
                <View style={styles.subRow} key={subIndex}>
                  <Text style={styles.subCell}>{subCourse.course}</Text>
                  <Text style={styles.subCell}>{subCourse.scoreAchieved}</Text>
                  <Text style={styles.subCell}>{subCourse.timeTaken}</Text>
                  <Text style={styles.subCell}>{subCourse.noOfAttempts}</Text>
                  <Text style={styles.subCell}>{subCourse.assignedDate}</Text>
                  <Text style={styles.subCell}>{subCourse.completedDate}</Text>
                  <Text style={styles.subCell}>{subCourse.taskStatus}</Text>
                </View>
              ))}
            </React.Fragment>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default UserPDF
